"""AI Services Package

This package contains AI-powered analysis services for document processing.
"""

from app.ai.job_description_service import (
    JobDescriptionAnalysisResult,
    JobDescriptionAnalysisService,
)
from app.ai.resume_service import ResumeAnalysisService
from app.schemas.resume import ResumeAnalysisResult

__all__ = [
    "JobDescriptionAnalysisResult",
    "JobDescriptionAnalysisService",
    "ResumeAnalysisResult",
    "ResumeAnalysisService",
]
