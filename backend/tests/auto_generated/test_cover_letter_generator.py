import pytest
from unittest.mock import patch, MagicMock, AsyncMock
from app.genkit_flows.cover_letter_generator import generate_tailored_cover_letter, CoverLetterOutput

@pytest.mark.asyncio
async def test_generate_cover_letter_success():
    """
    Test that the cover letter generator correctly calls the shared generation utility
    and returns the content string.
    """
    # Mock get_model for the decorator
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch("app.genkit_flows.cover_letter_generator.generate_with_model", new_callable=AsyncMock) as mock_generate:
        
        mock_get_model.return_value = MagicMock()
        
        # Setup expected response
        mock_output = CoverLetterOutput(content="Dear Hiring Manager,\n\nI am excited to apply.")
        mock_generate.return_value = mock_output
        
        # Test Data
        base_data = {"name": "Test User", "skills": ["Python", "AI"]}
        job_data = {"role": "Software Engineer", "company": "Tech Corp", "requirements": ["Coding"]}
        
        # Execute
        result = await generate_tailored_cover_letter(base_data, job_data)
        
        # Verify
        assert result == "Dear Hiring Manager,\n\nI am excited to apply."
        mock_generate.assert_called_once()
        
        # Check arguments
        _, kwargs = mock_generate.call_args
        assert kwargs["operation_name"] == "cover_letter_generation"
        assert kwargs["temperature"] == 0.7
        assert "prompt" in kwargs
        assert "Test User" in kwargs["prompt"]
        assert "Tech Corp" in kwargs["prompt"]

@pytest.mark.asyncio
async def test_generate_cover_letter_with_voice():
    """Test including voice profile data in the prompt."""
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch("app.genkit_flows.cover_letter_generator.generate_with_model", new_callable=AsyncMock) as mock_generate:
        
        mock_get_model.return_value = MagicMock()
        mock_generate.return_value = CoverLetterOutput(content="Voice tailored content.")
        
        base_data = {"name": "User"}
        job_data = {"role": "Dev"}
        voice_data = {"tone": "Witty", "style": "Concise"}
        
        await generate_tailored_cover_letter(base_data, job_data, voice_profile=voice_data)
        
        _, kwargs = mock_generate.call_args
        assert "Witty" in kwargs["prompt"]
        assert "Writing Style & Voice Profile" in kwargs["prompt"]
