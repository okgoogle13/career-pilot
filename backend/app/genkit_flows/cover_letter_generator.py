import json
from typing import Optional
from pydantic import BaseModel

from app.genkit_flows.flow_decorator import simple_genkit_flow
from app.genkit_flows.shared_utils import generate_with_model

class CoverLetterOutput(BaseModel):
    content: str


@simple_genkit_flow()
async def generate_tailored_cover_letter(
    base_profile_data: dict,
    job_analysis_data: dict,
    voice_profile: Optional[dict] = None,
) -> str:
    """
    Acts as an expert career coach to write a tailored cover letter,
    adapting to the user's unique writing style.
    """

    # Build voice profile section if it exists
    voice_profile_section = ""
    if voice_profile:
        voice_profile_section = f"""
        **Writing Style & Voice Profile:**
        - Tone: {voice_profile.get('tone', 'Not specified')}
        - Style: {voice_profile.get('style', 'Not specified')}
        - Vocabulary Level: {voice_profile.get('vocabularyLevel', 'Professional')}
        - Preferred Phrasing: {', '.join(voice_profile.get('common_phrases', []))}
        
        CRITICAL: Adoption of this voice is mandatory. The output must sound like the user wrote it.
        """

    prompt = f"""You are an expert career coach. Write a compelling, tailored cover letter.

    **Candidate Profile:**
    Name: {base_profile_data.get('name', 'Candidate')}
    Skills: {', '.join(base_profile_data.get('skills', []))}
    Experience: {json.dumps(base_profile_data.get('experience', []), indent=2)}

    **Target Job:**
    Role: {job_analysis_data.get('role', 'Target Role')}
    Company: {job_analysis_data.get('company', 'Target Company')}
    Key Requirements: {', '.join(job_analysis_data.get('requirements', []))}

    {voice_profile_section}

    **Instructions:**
    1. Write a complete cover letter (Opening, Body, Closing).
    2. Focus on connecting the candidate's specific experience to the job requirements.
    3. Use the specified voice and tone.
    4. Keep it concise (under 400 words) but impactful.
    5. Return JSON with a single "content" field containing the markdown text of the letter.
    """

    result = await generate_with_model(
        prompt=prompt,
        output_schema=CoverLetterOutput,
        operation_name="cover_letter_generation",
        temperature=0.7 # Higher temperature for creativity
    )
    
    return result.content
