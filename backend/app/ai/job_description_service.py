"""Job Description Analysis Service

Provides AI-powered analysis of job descriptions using the generic document processing framework.
This service extracts structured information from job postings including requirements, responsibilities,
salary ranges, and company details.
"""

from typing import List, Optional

from pydantic import BaseModel, Field

from app.core.document_processing import PromptTemplates, process_document


class JobDescriptionAnalysisResult(BaseModel):
    """Structured result from job description analysis."""

    title: str = Field(default="", description="Job title")
    company: Optional[str] = Field(default=None, description="Company name")
    location: Optional[str] = Field(default=None, description="Job location")
    salary_range: Optional[str] = Field(default=None, description="Salary range if mentioned")
    
    required_skills: List[str] = Field(
        default_factory=list,
        description="Skills explicitly marked as required or essential"
    )
    preferred_skills: List[str] = Field(
        default_factory=list,
        description="Skills marked as preferred, desired, or nice-to-have"
    )
    
    responsibilities: List[str] = Field(
        default_factory=list,
        description="Key job responsibilities and duties"
    )
    qualifications: List[str] = Field(
        default_factory=list,
        description="Required qualifications (education, certifications, etc.)"
    )
    
    benefits: List[str] = Field(
        default_factory=list,
        description="Employee benefits mentioned"
    )
    
    summary: str = Field(
        default="",
        description="Brief summary of the job opportunity"
    )
    
    experience_level: Optional[str] = Field(
        default=None,
        description="Experience level (entry, mid, senior, executive)"
    )
    
    employment_type: Optional[str] = Field(
        default=None,
        description="Employment type (full-time, part-time, contract, etc.)"
    )
    
    remote_policy: Optional[str] = Field(
        default=None,
        description="Remote work policy (on-site, hybrid, remote)"
    )


class JobDescriptionAnalysisService:
    """Service for analyzing job descriptions using AI."""
    
    def __init__(self):
        """Initialize the job description analysis service."""
        pass
    
    async def analyze_job_description(self, job_description_text: str) -> JobDescriptionAnalysisResult:
        """Analyze a job description and extract structural information.
        
        Args:
            job_description_text: Raw text content of the job description
            
        Returns:
            JobDescriptionAnalysisResult with extracted information
            
        Raises:
            ValueError: If input validation fails
            DocumentProcessingError: If AI processing fails
        """
        # Input validation
        if not job_description_text or not isinstance(job_description_text, str):
            raise ValueError("Job description must be a non-empty string")
        
        if len(job_description_text.strip()) < 10:
            raise ValueError("Job description is too short to analyze meaningfully")
        
        # Use generic document processing
        result = await process_document(
            file_content=job_description_text.strip(),
            prompt_template=PromptTemplates.JOB_DESCRIPTION_ANALYSIS,
            response_model=JobDescriptionAnalysisResult,
        )
        
        return result
    
    async def extract_skills(self, job_description_text: str) -> List[str]:
        """Extract all skills (required + preferred) from a job description.
        
        Args:
            job_description_text: Raw text content of the job description
            
        Returns:
            Combined list of required and preferred skills
        """
        analysis = await self.analyze_job_description(job_description_text)
        
        # Combine and deduplicate skills
        all_skills = list(set(analysis.required_skills + analysis.preferred_skills))
        
        return all_skills
    
    async def extract_requirements(self, job_description_text: str) -> dict:
        """Extract all requirements from a job description.
        
        Args:
            job_description_text: Raw text content of the job description
            
        Returns:
            Dictionary with categorized requirements
        """
        analysis = await self.analyze_job_description(job_description_text)
        
        return {
            "required_skills": analysis.required_skills,
            "preferred_skills": analysis.preferred_skills,
            "qualifications": analysis.qualifications,
            "experience_level": analysis.experience_level,
        }
