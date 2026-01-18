import pytest
from unittest.mock import MagicMock, patch

# Patch decorator before import
with patch('app.genkit_flows.flow_decorator.simple_genkit_flow') as mock_decorator:
    mock_decorator.return_value = lambda x: x
    from app.genkit_flows.job_analyzer import analyze_job_description

@pytest.fixture
def mock_dependencies():
    with patch('app.genkit_flows.job_analyzer.get_model') as mock_get_model, \
         patch('app.genkit_flows.job_analyzer.format_prompt') as mock_format_prompt:
        
        mock_model_instance = MagicMock()
        mock_response = MagicMock()
        mock_response.output.return_value = {"role": "Engineer", "requirements": ["Python"]}
        mock_model_instance.generate.return_value = mock_response
        mock_get_model.return_value = mock_model_instance
        
        mock_format_prompt.return_value = "Formatted Prompt"
        
        yield {
            "get_model": mock_get_model,
            "format_prompt": mock_format_prompt,
            "model_instance": mock_model_instance
        }

def test_analyze_job_description_success(mock_dependencies):
    """Test successful job analysis."""
    job_desc = "We need a Python engineer."
    
    result = analyze_job_description(job_desc)
    
    assert result == {"role": "Engineer", "requirements": ["Python"]}
    
    mock_dependencies["format_prompt"].assert_called_once_with(
        "job_description_analysis",
        job_description=job_desc
    )
    
    call_args = mock_dependencies["model_instance"].generate.call_args
    assert call_args.kwargs['prompt'] == "Formatted Prompt"
    assert call_args.kwargs['config']['response_mime_type'] == "application/json"

def test_analyze_job_description_empty(mock_dependencies):
    """Test with empty string."""
    result = analyze_job_description("")
    
    # Should proceed to call the model with empty input
    mock_dependencies["format_prompt"].assert_called_once_with(
        "job_description_analysis",
        job_description=""
    )
