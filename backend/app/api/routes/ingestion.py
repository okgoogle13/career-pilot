"""
Career Ingestion API Endpoint
Handles file upload and AI-powered career data extraction using Genkit flows.
"""
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, status
import logging
import uuid
from datetime import datetime

# Genkit Flows
from app.genkit_flows.smart_ingestion import contextTaggerFlow, resumeExtractorFlow
# Models
from app.models.master_profile_schema import MasterCareerProfile
from app.schemas.career_master import (
    CareerDatabase, 
    PersonalInformation, 
    CareerProfile, 
    MasterSkill, 
    CareerEntry, 
    StructuredAchievement, 
    KSCResponse, 
    EntryType,
    SkillProficiency
)
from app.core.dependencies import get_current_user
from app.models import User
from app.services.user_profile_service import user_profile_service
from app.utils.pdf_parser import extract_text_from_upload

logger = logging.getLogger(__name__)

router = APIRouter()

def generate_id(prefix: str) -> str:
    return f"{prefix}-{str(uuid.uuid4())[:8]}"

def map_master_profile_to_legacy_db(profile: MasterCareerProfile) -> CareerDatabase:
    """
    Maps the modern Genkit MasterCareerProfile to the legacy CareerDatabase schema
    required by the frontend and database.
    """
    # 1. Personal Info
    personal_info = PersonalInformation(
        FullName=profile.personalInfo.name,
        Email=profile.personalInfo.email,
        Phone=profile.personalInfo.phone or "",
        Location=profile.personalInfo.location or "",
        Portfolio_Website_URLs=[str(profile.personalInfo.linkedin)] if profile.personalInfo.linkedin else []
    )
    if profile.personalInfo.portfolio:
        personal_info.portfolio_urls.append(str(profile.personalInfo.portfolio))

    # 2. Skills
    master_skills = []
    for skill in profile.skills.technical:
        master_skills.append(MasterSkill(Skill_Name=skill, Category="Technical", Subtype=[], Proficiency=SkillProficiency.COMPETENT))
    for tool in profile.skills.tools:
        master_skills.append(MasterSkill(Skill_Name=tool, Category="Tools", Subtype=[], Proficiency=SkillProficiency.COMPETENT))
    for soft in profile.skills.soft:
        master_skills.append(MasterSkill(Skill_Name=soft, Category="Soft Skills", Subtype=[], Proficiency=SkillProficiency.COMPETENT))
    for method in profile.skills.methodologies:
        master_skills.append(MasterSkill(Skill_Name=method, Category="Methodologies", Subtype=[], Proficiency=SkillProficiency.COMPETENT))
    
    # 3. Career Entries and Achievements
    career_entries = []
    structured_achievements = []
    
    # Process Work Experience
    for work in profile.workExperience:
        entry_id = generate_id("entry")
        
        # Create Entry
        entry = CareerEntry(
            Entry_ID=entry_id,
            Entry_Type=EntryType.WORK_EXPERIENCE,
            Organization=work.company,
            Role=work.jobTitle,
            StartDate=work.startDate,
            EndDate=work.endDate,
            Location=work.location or "",
            Core_Responsibilities_Scope="\n".join(work.responsibilities),
            Subtype_Tags=[]
        )
        career_entries.append(entry)
        
        # Create Achievements
        for ach_text in work.achievements:
            ach_id = generate_id("ach")
            # Create a basic structured achievement (AI extraction of metric/verb would go here in future)
            sa = StructuredAchievement(
                Achievement_ID=ach_id,
                Entry_ID=entry_id,
                Original_Text=ach_text,
                Action_Verb="Demonstrated", # Placeholder
                Noun_Task="Responsibility", # Placeholder
                Metric="N/A",               # Placeholder
                Strategy="Professional Practice", # Placeholder
                Outcome="Successful Result", # Placeholder
                Skills_Used=work.skillsUsed,
                Tools_Used=[],
                Subtype_Tags=[],
                Needs_Review_Flag=True # Flag for user review since fields are placeholders
            )
            structured_achievements.append(sa)

    # Process Education
    for edu in profile.education:
        entry_id = generate_id("edu")
        entry = CareerEntry(
            Entry_ID=entry_id,
            Entry_Type=EntryType.EDUCATION,
            Organization=edu.institution,
            Role=f"{edu.degree} in {edu.fieldOfStudy or 'General'}",
            StartDate=edu.startDate or "",
            EndDate=edu.endDate,
            Location="",
            Core_Responsibilities_Scope=edu.notes or "",
            Subtype_Tags=[]
        )
        career_entries.append(entry)

    # 4. KSC Responses
    ksc_responses = []
    for ksc in profile.keySelectionCriteriaExamples:
        ksc_id = generate_id("ksc")
        ksc_resp = KSCResponse(
            KSC_ID=ksc_id,
            KSC_Prompt=ksc.criteria,
            Situation="Situation...", # Placeholder
            Task="Task...",
            Action="Action...",
            Result="Result...",
            Skills_Used=ksc.relatedSkills,
            Subtype_Tags=[],
            Original_Text=ksc.example,
            Needs_Review_Flag=True,
            STAR_Feedback="Extracted by AI",
            Linked_Entry_ID=None
        )
        ksc_responses.append(ksc_resp)

    # 5. Career Profile (Summary/Targets)
    # We use tags/summary from profile if available, but profile structure is slightly different
    # CareerProfile expects Target_Titles, Master_Summary_Points
    career_profile_summary = [profile.personalInfo.summary]
    
    return CareerDatabase(
        Personal_Information=personal_info,
        Career_Profile=CareerProfile(
            Target_Titles=[], # Populated later or from context tags if passed
            Master_Summary_Points=career_profile_summary
        ),
        Master_Skills_Inventory=master_skills,
        Career_Entries=career_entries,
        Structured_Achievements=structured_achievements,
        KSC_Responses=ksc_responses
    )

@router.post("/ingest", response_model=CareerDatabase, status_code=status.HTTP_200_OK)
async def ingest_career_documents(
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_user)
):
    """
    Upload career documents (PDF, DOCX, TXT) for AI analysis.
    Uses Genkit 'Smart Ingestion' flows.
    """
    try:
        # Extract text
        combined_text_parts = []
        for file in files:
            logger.info(f"Processing file: {file.filename}")
            text = await extract_text_from_upload(file)
            if text:
                combined_text_parts.append(f"--- SOURCE: {file.filename} ---\n{text}")
            else:
                logger.warning(f"No text extracted from {file.filename}")
        
        if not combined_text_parts:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No readable text found in uploaded files."
            )
        
        full_text = "\n\n".join(combined_text_parts)
        logger.info(f"Combined text length: {len(full_text)} characters")
        
        # --- Genkit AI Execution ---
        # 1. Context Tagging
        tags = await contextTaggerFlow(full_text, user_id=current_user.uid)
        
        # 2. Resume Extraction
        profile = await resumeExtractorFlow(full_text, tags.model_dump(), user_id=current_user.uid)
        
        # 3. Map to DB Schema
        career_db = map_master_profile_to_legacy_db(profile)
        
        # update target titles from tags
        if tags.roleType:
            career_db.career_profile.target_titles.append(tags.roleType)
        
        # Persist
        try:
            await user_profile_service.update_user_profile(
                user_id=current_user.uid,
                update_data={"career_database": career_db.model_dump(by_alias=True)}
            )
            logger.info(f"Saved career database for user {current_user.uid}")
        except Exception as e:
            logger.warning(f"Failed to persist to Firestore: {e}. Continuing.")
        
        return career_db
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Career ingestion failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI processing failed: {str(e)}"
        )
