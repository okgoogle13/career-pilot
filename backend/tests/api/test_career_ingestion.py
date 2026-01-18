
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock, AsyncMock
from app.main import app
from app.models.ingestion_schemas import SuggestedTags
from app.models.master_profile_schema import MasterCareerProfile

from app.core.dependencies import get_current_user
from app.models import User

client = TestClient(app)

# Mock Auth Dependency
def mock_get_current_user():
    return User(uid="test-user-id", email="test@example.com")

app.dependency_overrides[get_current_user] = mock_get_current_user

@pytest.fixture
def mock_genkit_flows():
    with patch("app.api.routes.ingestion.contextTaggerFlow", new_callable=AsyncMock) as mock_tagger, \
         patch("app.api.routes.ingestion.resumeExtractorFlow", new_callable=AsyncMock) as mock_extractor, \
         patch("app.api.routes.ingestion.user_profile_service") as mock_service:
        
        # Mock Context Tagger Response
        mock_tagger.return_value = SuggestedTags(
            roleType="Software Engineer",
            subsectors=["Tech", "AI"],
            confidence=0.95
        )
        
        # Mock Resume Extractor Response
        # We need a minimal valid MasterCareerProfile
        mock_profile = MasterCareerProfile(
            personalInfo={
                "name": "Test User",
                "email": "test@example.com",
                "summary": "Test Summary"
            },
            skills={
                "technical": ["Python"],
                "tools": ["Git"],
                "soft": ["Communication"],
                "methodologies": ["Agile"]
            },
            workExperience=[
                {
                    "jobTitle": "Dev",
                    "company": "Test Co",
                    "startDate": "2020-01",
                    "endDate": "Present",
                    "responsibilities": ["Coding"],
                    "achievements": ["Fixed bug"],
                    "skillsUsed": ["Python"]
                }
            ],
            education=[
                {
                    "institution": "Test Uni",
                    "degree": "BS CS",
                    "startDate": "2016",
                    "endDate": "2020"
                }
            ],
            projects=[],
            certifications=[],
            keySelectionCriteriaExamples=[]
        )
        mock_extractor.return_value = mock_profile
        
        # Mock Firestore Service (Service methods are async in real life usually, let's check or mock as MagicMock if called with await? 
        # user_profile_service.update_user_profile is likely async. Let's make it AsyncMock too to be safe/correct.)
        mock_service.update_user_profile = AsyncMock(return_value=True)
        
        yield mock_tagger, mock_extractor, mock_service

def test_ingest_career_documents_success(mock_genkit_flows):
    """Test successful ingestion of a PDF document."""
    mock_tagger, mock_extractor, mock_service = mock_genkit_flows
    
    # Create a dummy PDF file (or text file behaving like one for the mock)
    # Since we mock extract_text_from_upload, the actual file content matters less
    # BUT we need to mock extract_text_from_upload too if we don't want to parse real PDFs
    
    with patch("app.api.routes.ingestion.extract_text_from_upload", return_value="Mock Resume Content"):
        response = client.post(
            "/api/v1/ingest",
            files={"files": ("resume.pdf", b"%PDF-1.4...", "application/pdf")},
            headers={"Authorization": "Bearer test-token"} # Assuming auth is mocked or not required for test client if dependency overrides are used
        )
    
    # Check 200 OK
    assert response.status_code == 200
    
    # Check Response Schema (CareerDatabase)
    data = response.json()
    assert "Personal_Information" in data
    assert data["Personal_Information"]["FullName"] == "Test User"
    assert "Career_Profile" in data
    assert "Software Engineer" in data["Career_Profile"]["Target_Titles"]
    assert len(data["Master_Skills_Inventory"]) == 4 # Tech + Tool + Soft + Methodologies (Agile is methodology but mapped to same list? Let's check logic. Logic maps all 4 categories.)
    
    # Check Genkit Flows were called
    mock_tagger.assert_called_once()
    mock_extractor.assert_called_once()
    
    # Check Firestore Persistence
    mock_service.update_user_profile.assert_called_once()

def test_ingest_no_files():
    """Test upload without files."""
    response = client.post(
        "/api/v1/ingest",
        files=[], # Empty files
        headers={"Authorization": "Bearer test-token"}
    )
    assert response.status_code == 422 # FastAPI validation error for missing field

