import pytest
from unittest.mock import MagicMock, patch
import os

# Create a clean import environment for the module under test
import sys
# We don't import yet, strictly inside test functions if we want to control top-level?
# Actually, the top-level try/except blocks run on import. 
# We can just patch the module-level variables since they are what determine behavior.

from app.core import genkit_init

@pytest.fixture(autouse=True)
def reset_state():
    """Reset global state before each test."""
    genkit_init.initialized = False
    genkit_init.genkit_instance = None
    yield
    genkit_init.initialized = False
    genkit_init.genkit_instance = None

def test_init_genkit_no_api_key():
    """Test initialization fails without API Key."""
    # We patch the source module. If it hasn't been imported, patch might auto-create it or we rely on sys.modules.
    # The simplest way to ensure 'from ... import ...' works/fails is mocking sys.modules, 
    # but simplest way to mock the RESULT is patching the function if it exists.
    
    with patch.dict(os.environ, {}, clear=True):
        # We mock app.core.secret_manager.get_secret to return None
        # Note: We must ensure app.core.secret_manager is importable or mocked
        mock_sm = MagicMock()
        mock_sm.get_secret.return_value = None
        
        with patch.dict('sys.modules', {'app.core.secret_manager': mock_sm}):
            result = genkit_init.init_genkit()
            assert result is False

def test_init_genkit_with_native_genkit_success():
    """Test initialization using the native Genkit library path."""
    with patch.dict(os.environ, {"GEMINI_API_KEY": "fake_key"}), \
         patch('app.core.genkit_init.GENKIT_AVAILABLE', True), \
         patch('app.core.genkit_init.genkit_ai') as mock_genkit_mod, \
         patch('app.core.genkit_init.genkit_plugins_google') as mock_plugins:
        
        # Setup Genkit classes
        mock_genkit_class = MagicMock()
        mock_google_class = MagicMock()
        mock_genkit_mod.Genkit = mock_genkit_class
        mock_plugins.GoogleAI = mock_google_class
        
        result = genkit_init.init_genkit()
        
        assert result is True
        assert genkit_init.initialized is True
        mock_genkit_class.assert_called_once() # Initialized
        mock_google_class.assert_called_once_with(api_key="fake_key")

def test_init_genkit_fallback_to_google_generativeai():
    """Test fallback when native Genkit fails but google-generativeai works."""
    with patch.dict(os.environ, {"GEMINI_API_KEY": "fake_key"}), \
         patch('app.core.genkit_init.GENKIT_AVAILABLE', False), \
         patch('app.core.genkit_init.GOOGLE_GENERATIVEAI_AVAILABLE', True), \
         patch('app.core.genkit_init.google_generativeai') as mock_genai:
        
        # Setup mock behavior
        mock_genai.list_models.return_value = ["gemini-pro"]
        
        result = genkit_init.init_genkit()
        
        assert result is True
        assert genkit_init.initialized is True
        mock_genai.configure.assert_called_with(api_key="fake_key")
        
        # Verify wrapper creation
        instance = genkit_init.get_model()
        assert instance.model_name == "gemini-2.0-flash"
        
        # Verify generate call
        mock_genai.GenerativeModel.return_value.generate_content.return_value = "Content"
        output = instance.generate("prompt")
        assert output == "Content"

def test_check_health():
    """Test health check output."""
    with patch('app.core.genkit_init.initialized', True), \
         patch('app.core.genkit_init.is_genkit_enabled', return_value=True), \
         patch('app.core.genkit_init.genkit_instance', MagicMock()):
        
        status = genkit_init.check_genkit_health()
        
        assert status["initialized"] is True
        assert status["enabled"] is True
        assert len(status["errors"]) == 0

def test_startup_genkit_disabled():
    """Test startup respects env var."""
    with patch('app.core.genkit_init.is_genkit_enabled', return_value=False), \
         patch('app.core.genkit_init.init_genkit') as mock_init:
        
        genkit_init.startup_genkit()
        mock_init.assert_not_called()
