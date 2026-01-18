# backend/app/core/ai/model_dispatcher.py

from typing import Any, Dict, Optional

from app.core.ai_config import get_ai_config
from app.core.ai.llm_service import get_llm_response
from app.core.loguru_config import get_logger

logger = get_logger(__name__)

def dispatch_llm_call(
    task_type: str,
    prompt: str,
    response_format: str = "text",
    temperature: Optional[float] = None,
    **kwargs: Any
) -> Dict[str, Any]:
    """
    Dispatches an LLM call to the appropriate model based on task type configuration.

    Args:
        task_type: The type of task (e.g., "cover_letter_generation")
        prompt: The input prompt
        response_format: Expected format ("text" or "json")
        temperature: Optional temperature override
        **kwargs: Additional parameters

    Returns:
        Dictionary containing the generated content
    """
    config = get_ai_config()
    service_config = config.get_service_config(task_type)
    
    model_params = {
        "task_type": task_type,
        "response_format": response_format,
    }
    
    if temperature is not None:
        model_params["temperature"] = temperature
        
    if service_config:
        model_params.update({
            "service_name": service_config.service_name,
            "model": service_config.primary_model,
        })
    else:
        logger.warning(f"No service config found for task_type: {task_type}, using defaults")
        model_params["model"] = "gemini-2.5-flash" # Default fallback
        
    # Call the LLM service
    response = get_llm_response(prompt, model_params)
    
    # Adapt response to expected format (callers expect 'content')
    # get_llm_response returns 'response' key
    return {
        "content": response.get("response", ""),
        "model": response.get("model"),
        "tokens_used": response.get("tokens_used", 0),
        "cached": response.get("cached", False)
    }
