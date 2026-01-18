"""Resume Analysis Service

Provides AI-powered analysis of resumes using the generic document processing framework.
This service extracts structured information from resumes including skills, experience, 
education, and generates professional summaries.
"""

from typing import Optional

from app.core.document_processing import PromptTemplates, process_document
from app.schemas.resume import ResumeAnalysisResult


class ResumeAnalysisService:
    """Service for analyzing resumes using AI."""
    
    def __init__(self):
        """Initialize the resume analysis service."""
        pass
    
    async def analyze_resume(self, resume_text: str) -> ResumeAnalysisResult:
        """Analyze a resume and extract structural information.
        
        Args:
            resume_text: Raw text content of the resume
            
        Returns:
            ResumeAnalysisResult with extracted information
            
        Raises:
            ValueError: If input validation fails
            DocumentProcessingError: If AI processing fails
        """
        # Input validation
        if not resume_text or not isinstance(resume_text, str):
            raise ValueError("Resume content must be a non-empty string")
        
        if len(resume_text.strip()) < 10:
            raise ValueError("Resume content is too short to analyze meaningfully")
        
        # Use generic document processing
        result = await process_document(
            file_content=resume_text.strip(),
            prompt_template=PromptTemplates.RESUME_ANALYSIS,
            response_model=ResumeAnalysisResult,
        )
        
        return result
