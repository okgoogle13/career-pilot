import pytest
import json
from unittest.mock import MagicMock, patch

# Import the module to be tested
# We need to patch the decorator BEFORE importing the module to avoid Genkit registration side effects
with patch('app.genkit_flows.flow_decorator.simple_genkit_flow') as mock_decorator:
    # Make the decorator a passthrough
    mock_decorator.return_value = lambda x: x
    from app.genkit_flows.resume_analyzer import compare_resume_to_job

@pytest.fixture
def mock_dependencies():
    with patch('app.genkit_flows.resume_analyzer.get_model') as mock_get_model, \
         patch('app.genkit_flows.resume_analyzer.format_prompt') as mock_format_prompt:
        
        # Setup mock model response
        mock_model_instance = MagicMock()
        mock_response = MagicMock()
        mock_response.output.return_value = {"match_score": 85, "recommendations": ["Improve summary"]}
        mock_model_instance.generate.return_value = mock_response
        mock_get_model.return_value = mock_model_instance
        
        mock_format_prompt.return_value = "Formatted Prompt"
        
        yield {
            "get_model": mock_get_model,
            "format_prompt": mock_format_prompt,
            "model_instance": mock_model_instance
        }

def test_compare_resume_to_job_success(mock_dependencies):
    """Test successful execution of the flow."""
    resume_text = "Experienced Python Developer..."
    job_analysis_data = {"skills": ["Python", "FastAPI"]}
    
    result = compare_resume_to_job(resume_text, job_analysis_data)
    
    # Assertions
    assert result == {"match_score": 85, "recommendations": ["Improve summary"]}
    
    # Verify prompt formatting
    mock_dependencies["format_prompt"].assert_called_once_with(
        "resume_job_comparison",
        resume_text=resume_text,
        job_analysis_data=json.dumps(job_analysis_data, indent=2)
    )
    
    # Verify model generation
    mock_dependencies["model_instance"].generate.assert_called_once()
    call_args = mock_dependencies["model_instance"].generate.call_args
    assert call_args.kwargs['prompt'] == "Formatted Prompt"
    assert call_args.kwargs['config']['response_mime_type'] == "application/json"

def test_compare_resume_to_job_empty_inputs(mock_dependencies):
    """Test behavior with empty inputs."""
    resume_text = ""
    job_analysis_data = {}
    
    result = compare_resume_to_job(resume_text, job_analysis_data)
    
    # Should still process, just with empty data strings
    mock_dependencies["format_prompt"].assert_called_once_with(
        "resume_job_comparison",
        resume_text="",
        job_analysis_data="{}"
    )

def test_compare_resume_to_job_malformed_response(mock_dependencies):
    """Test handling when model returns unexpected structure (though code assumes it works)."""
    # Verify the code creates the model and calls generate, even if we mock the output differently
    expected_output = {"error": "Something weird"}
    mock_dependencies["model_instance"].generate.return_value.output.return_value = expected_output
    
    result = compare_resume_to_job("resume", {})
    assert result == expected_output
