import pytest
from unittest.mock import MagicMock, patch, AsyncMock
from pydantic import BaseModel
from dataclasses import dataclass

# Mock result class
@dataclass
class MockResult:
    success: bool
    data: any
    error: any = None

# Mock dependencies before import
with patch('app.genkit_flows.flow_decorator.genkit_flow') as mock_decorator:
    mock_decorator.return_value = lambda func: func
    from app.genkit_flows.smart_ingestion import (
        contextTaggerFlow,
        resumeExtractorFlow,
        kscExtractorFlow,
        voiceProfileExtractorFlow,
        skillsExtractorFlow,
        _generate_with_model
    )

# Mock Models
class MockSuggestedTags(BaseModel):
    roleType: str
    subsectors: list[str]
    confidence: float

class MockMasterCareerProfile(BaseModel):
    workExperience: list = []
    education: list = []
    skills: dict = {}

# Test Helper
@pytest.mark.asyncio
async def test_generate_with_model_success():
    """Test the internal helper function _generate_with_model."""
    with patch('app.genkit_flows.shared_utils.get_model') as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion.enhanced_ai_handler') as mock_handler:

        # Setup Model
        mock_model = MagicMock()
        mock_response = MagicMock()
        mock_response.output.return_value = {"roleType": "Dev", "confidence": 0.9}
        # model.generate is async
        mock_model.generate = AsyncMock(return_value=mock_response)
        mock_get_model.return_value = mock_model

        # Setup Handler
        # execute_ai_operation takes (func, context, strategy)
        # We need to execute `func` to verify it calls model.generate
        async def side_effect(func, context, strategy):
            data = await func() # This calls model.generate
            return MockResult(success=True, data=data)
        
        mock_handler.execute_ai_operation = AsyncMock(side_effect=side_effect)

        # Call
        result = await _generate_with_model(
            prompt="test",
            output_schema=MockSuggestedTags,
            operation_name="test_op"
        )

        assert result == {"roleType": "Dev", "confidence": 0.9}
        mock_model.generate.assert_called_once()

@pytest.mark.asyncio
async def test_context_tagger_flow():
    """Test contextTaggerFlow."""
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion._generate_with_model') as mock_gen:
        mock_get_model.return_value = MagicMock()
        
        mock_output = MagicMock()
        mock_output.roleType = "Engineer"
        mock_output.subsectors = ["Tech"]
        mock_output.confidence = 0.95
        mock_gen.return_value = mock_output

        result = await contextTaggerFlow("Resume text")

        assert result.roleType == "Engineer"
        mock_gen.assert_called_once()
        assert "context_tagger" in mock_gen.call_args.kwargs['operation_name']

@pytest.mark.asyncio
async def test_resume_extractor_flow():
    """Test resumeExtractorFlow."""
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion._generate_with_model') as mock_gen:
        mock_get_model.return_value = MagicMock()
        
        mock_profile = MagicMock()
        mock_profile.workExperience = []
        mock_profile.education = []
        mock_profile.skills.technical = []
        mock_gen.return_value = mock_profile

        confirmed_tags = {"roleType": "Dev", "subsectors": ["IT"]}
        result = await resumeExtractorFlow("Resume", confirmed_tags)

        assert result == mock_profile
        mock_gen.assert_called_once()
        # Check prompt injection
        call_args = mock_gen.call_args
        assert "Dev" in call_args.kwargs['prompt']
        assert "IT" in call_args.kwargs['prompt']

@pytest.mark.asyncio
async def test_ksc_extractor_flow():
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion._generate_with_model') as mock_gen:
        mock_get_model.return_value = MagicMock()

        mock_ksc_res = MagicMock()
        mock_ksc_res.examples = []
        mock_gen.return_value = mock_ksc_res

        result = await kscExtractorFlow("KSC text", {})
        assert result == mock_ksc_res

@pytest.mark.asyncio
async def test_voice_profile_extractor_flow():
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion._generate_with_model') as mock_gen:
        mock_get_model.return_value = MagicMock()

        mock_voice = MagicMock()
        mock_voice.tone = "Professional"
        mock_voice.vocabularyLevel = "High"
        mock_gen.return_value = mock_voice

        result = await voiceProfileExtractorFlow("Sample", {})
        assert result == mock_voice

@pytest.mark.asyncio
async def test_skills_extractor_flow():
    with patch("app.genkit_flows.flow_decorator.get_model") as mock_get_model, \
         patch('app.genkit_flows.smart_ingestion._generate_with_model') as mock_gen:
        mock_get_model.return_value = MagicMock()

        mock_skills = MagicMock()
        mock_skills.technical = ["Python"]
        mock_skills.tools = []
        mock_skills.soft = []
        mock_skills.methodologies = []
        mock_gen.return_value = mock_skills

        result = await skillsExtractorFlow("Resume", {})
        assert result == mock_skills
