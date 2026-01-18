
import logging
from typing import Optional, Any
from pydantic import BaseModel

from app.core.enhanced_ai_error_handling import (
    AIOperationContext,
    AIServiceType,
    create_fallback_strategy,
    enhanced_ai_handler,
)
from app.core.genkit_init import get_model

logger = logging.getLogger(__name__)

async def generate_with_model(
    prompt: str, 
    output_schema: type[BaseModel], 
    operation_name: str, 
    user_id: str = "system",
    temperature: float = 0.2
) -> BaseModel:
    """
    Generate structured output from Gemini model with enhanced error handling.

    Args:
        prompt: The prompt to send to the model
        output_schema: Pydantic model for structured output
        operation_name: Name of the operation for logging
        user_id: User ID for tracking (default: "system")
        temperature: Temperature for generation (default: 0.2)

    Returns:
        Parsed output matching the output_schema

    Raises:
        RuntimeError: If model is unavailable or generation fails
    """
    model = get_model()
    if not model:
        raise RuntimeError(f"Genkit model not available for {operation_name}")

    async def _generate():
        response = await model.generate(
            prompt=prompt,
            output_schema=output_schema,
            config={
                "response_mime_type": "application/json",
                "temperature": temperature,
            },
        )
        return response.output()

    # Execute with enhanced error handling
    result = await enhanced_ai_handler.execute_ai_operation(
        _generate,
        AIOperationContext(
            operation_name=operation_name,
            service_type=AIServiceType.GENKIT_FLOW,
            user_id=user_id,
            input_size=len(prompt),
        ),
        create_fallback_strategy(enabled=True, degraded_mode=False),
    )

    if not result.success:
        raise RuntimeError(
            f"{operation_name} failed: {result.error.message if result.error else 'Unknown error'}"
        )

    return result.data
