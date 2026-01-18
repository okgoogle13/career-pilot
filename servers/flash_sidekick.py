#!/usr/bin/env python3
"""
MCP Flash Sidekick - Dual-Engine Utility Agent
Optimized for high-speed startup to avoid Antigravity timeouts.
"""
import warnings
warnings.filterwarnings("ignore")

import json, os, sys, logging
from typing import Dict, Any

# Log to tmp to avoid permission issues
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [Sidekick] - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler('/tmp/mcp-flash-sidekick.log')]
)
logger = logging.getLogger("FlashSidekick")

# Lazy Loading Infrastructure
_genai = None
_genai_loaded = False

def _load_genai():
    global _genai, _genai_loaded
    if not _genai_loaded:
        try:
            import contextlib, io
            with contextlib.redirect_stderr(io.StringIO()):
                import google.generativeai as genai_module
            _genai = genai_module
            _genai_loaded = True
        except Exception as e:
            logger.error(f"Failed to load genai: {e}")
            _genai_loaded = True
    return _genai

class FlashSidekickServer:
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY", "")
        self.initialized = False
        self._models_cache = {}
        
        # Fast Engine Candidates
        env_fast = os.getenv("GEMINI_MODEL")
        self.fast_candidates = ["models/gemini-2.5-flash-lite", "models/gemini-2.0-flash-lite"]
        if env_fast and env_fast not in self.fast_candidates: self.fast_candidates.insert(0, env_fast)
            
        # Smart Engine Candidates (Prioritize Gemini 3.0 Pro for complex tasks)
        env_pro = os.getenv("GEMINI_PRO_MODEL")
        self.pro_candidates = ["models/gemini-3-pro-preview", "models/gemini-2.5-pro", "models/gemini-exp-1206"]
        if env_pro and env_pro not in self.pro_candidates: self.pro_candidates.insert(0, env_pro)


    def _ensure_genai(self):
        genai = _load_genai()
        if not self.initialized and genai and self.gemini_key:
            try:
                genai.configure(api_key=self.gemini_key)
                self.initialized = True
            except Exception as e:
                logger.error(f"Config failed: {e}")
        return genai

    def _get_model(self, candidates):
        genai = self._ensure_genai()
        if not genai: return None
        for name in candidates:
            if name in self._models_cache: return self._models_cache[name]
            try:
                model = genai.GenerativeModel(name)
                self._models_cache[name] = model
                return model
            except: continue
        return None

    def _call_gemini(self, engine_type, prompt, sys_instruct=""):
        # Select the initial candidate list based on engine type preference
        if engine_type == "pro":
            # Pro Tier: Gemini 3 Pro -> 2.5 Pro -> Exp
            candidates = self.pro_candidates + self.fast_candidates
        else:
            # Fast Tier: Flash -> Pro (fallback)
            candidates = self.fast_candidates + self.pro_candidates

        last_error = None
        
        # Fallback Loop
        for model_name in candidates:
            try:
                model = self._get_model([model_name]) # Get specific model
                if not model: continue
                
                full = f"System: {sys_instruct}\n\nUser: {prompt}"
                resp = model.generate_content(full)
                
                logger.info(f"Success with model: {model_name}")
                return {"content": resp.text if resp else "No response."}
                
            except Exception as e:
                error_str = str(e)
                logger.warning(f"Failed with {model_name}: {error_str}")
                last_error = error_str
                # Check for specific quota errors if needed, but for now we fallback on ANY error
                continue
        
        return {"content": f"All models failed. Last error: {last_error}"}

    # ========================================================================
    # DESIGN SYSTEM TOOLS (NEW)
    # ========================================================================
    
    def validate_token_compliance(self, component_code: str) -> str:
        """Audit a component for design token compliance using Fast engine."""
        audit_prompt = f"""Analyze this React component for design token compliance against Northcote Curio spec.

Component:
```
{component_code}
```

Check for:
1. Hardcoded colors (should use tokens like bg-wattle-gold)
2. Hardcoded spacing (should use px-lg, py-md, etc.)
3. Hardcoded border-radius (should use rounded-pebble, rounded-stone, etc.)
4. Invalid fonts (should use font-proclamation, font-bloom, font-field-note, font-annotation)
5. Invalid shadows (should use shadow-subtle, shadow-standard, etc.)
6. Missing interactive states (hover, focus, active, disabled)

For each violation, provide:
- Line number (estimate)
- Current value
- Recommended token
- Severity (critical/warning)

Format as JSON: {{ "violations": [...], "compliance_score": 0-100, "summary": "..." }}
"""
        res = self._call_gemini("fast", audit_prompt, 
            "You are a design system compliance auditor. Return valid JSON only.")
        return res.get("content", "{}")

    def generate_component_variant(self, base_component: str, variant_spec: str) -> str:
        """Generate a component variant using Fast engine."""
        prompt = f"""Generate a variant of this component:

Base Component:
```
{base_component}
```

Variant Specification:
{variant_spec}

Requirements:
1. Maintain same logic/structure as base
2. Use only Tailwind classes and design tokens
3. Apply Northcote Curio design system
4. Include all interactive states
5. Use TypeScript

Return complete component code only (no explanation).
"""
        res = self._call_gemini("fast", prompt, 
            "Generate React TSX code. Return code only, no markdown formatting.")
        return res.get("content", "")

    def analyze_figma_component(self, figma_description: str, component_name: str) -> str:
        """Analyze Figma component and suggest implementation using Pro engine."""
        prompt = f"""A Figma component needs to be implemented in React using Northcote Curio design system.

Component: {component_name}
Description: {figma_description}

Analyze and provide:
1. Archetype classification (Pebble, Stone, Leaf, Seed, Sentry, or custom)
2. Required props (with types)
3. Interactive states (rest, hover, active, focus, disabled)
4. Tokens needed (colors, spacing, typography, shadows)
5. Accessibility requirements
6. Component composition (atomic/molecular/organism)
7. Implementation strategy (steps)

Return JSON: {{
  "archetype": "...",
  "props": [...],
  "states": [...],
  "tokens_needed": {{...}},
  "a11y": [...],
  "composition": "...",
  "strategy": "..."
}}
"""
        res = self._call_gemini("pro", prompt,
            "Analyze Figma components architecturally. Return valid JSON only.")
        return res.get("content", "{}")

    def suggest_token_improvements(self, token_config: str) -> str:
        """Analyze token configuration and suggest improvements using Pro engine."""
        prompt = f"""Review this design token configuration for completeness and coherence:

{token_config}

Analyze:
1. Missing tokens (what's defined in Northcote Curio spec but not here?)
2. Incomplete families (color tonal families should have 5 variants each)
3. Semantic gaps (are all semantic roles covered?)
4. Naming inconsistencies
5. Value validation (are colors valid hex? spacing valid px?)
6. Recommendations for improvement

Return JSON: {{
  "missing_tokens": [...],
  "incomplete_families": [...],
  "semantic_gaps": [...],
  "naming_issues": [...],
  "invalid_values": [...],
  "recommendations": [...]
}}
"""
        res = self._call_gemini("pro", prompt,
            "Analyze token systems architecturally. Return valid JSON only.")
        return res.get("content", "{}")

    # ========================================================================
    # TOOL REGISTRY
    # ========================================================================

    def list_tools(self):
        return [
            # Original tools
            {"name": "quick_summarize", "description": "Fast (Flash-Lite): Summarize text.", "inputSchema": {"type": "object", "properties": {"text": {"type": "string"}}, "required": ["text"]}},
            {"name": "generate_idf", "description": "Fast (Flash-Lite): Generate Python IDF.", "inputSchema": {"type": "object", "properties": {"code": {"type": "string"}}, "required": ["code"]}},
            {"name": "consult_pro", "description": "Smart (Pro 2.5): Deep reasoning/coding.", "inputSchema": {"type": "object", "properties": {"query": {"type": "string"}, "context": {"type": "string"}}, "required": ["query"]}},
            
            # NEW Design System Tools
            {
                "name": "validate_token_compliance",
                "description": "Fast: Audit component for design token violations.",
                "inputSchema": {
                    "type": "object",
                    "properties": {"component_code": {"type": "string"}},
                    "required": ["component_code"]
                }
            },
            {
                "name": "generate_component_variant",
                "description": "Fast: Generate component variant from base.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "base_component": {"type": "string"},
                        "variant_spec": {"type": "string"}
                    },
                    "required": ["base_component", "variant_spec"]
                }
            },
            {
                "name": "analyze_figma_component",
                "description": "Smart: Analyze Figma component for implementation.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "figma_description": {"type": "string"},
                        "component_name": {"type": "string"}
                    },
                    "required": ["figma_description", "component_name"]
                }
            },
            {
                "name": "suggest_token_improvements",
                "description": "Smart: Analyze token config and suggest improvements.",
                "inputSchema": {
                    "type": "object",
                    "properties": {"token_config": {"type": "string"}},
                    "required": ["token_config"]
                }
            }
        ]

    def call_tool(self, name, args):
        if name == "quick_summarize": 
            res = self._call_gemini("fast", args.get("text",""), "Summarize concisely.")
        elif name == "generate_idf": 
            res = self._call_gemini("fast", args.get("code",""), "Extract signatures only.")
        elif name == "consult_pro": 
            res = self._call_gemini("pro", args.get("query",""), f"Context: {args.get('context','')}. Analyze deeply as a Senior Engineer.")
        elif name == "validate_token_compliance":
            res = {"content": self.validate_token_compliance(args.get("component_code", ""))}
        elif name == "generate_component_variant":
            res = {"content": self.generate_component_variant(
                args.get("base_component", ""),
                args.get("variant_spec", "")
            )}
        elif name == "analyze_figma_component":
            res = {"content": self.analyze_figma_component(
                args.get("figma_description", ""),
                args.get("component_name", "")
            )}
        elif name == "suggest_token_improvements":
            res = {"content": self.suggest_token_improvements(args.get("token_config", ""))}
        else: 
            return []
        return [{"type": "text", "text": res.get("content", "")}]

def handle_request(server, line):
    try:
        req = json.loads(line)
        method = req.get("method")
        req_id = req.get("id")
        
        # Build JSON-RPC 2.0 response
        resp = {"jsonrpc": "2.0", "id": req_id}
        
        if method == "initialize":
            resp["result"] = {
                "protocolVersion": "2024-11-05",
                "capabilities": {"tools": {}},
                "serverInfo": {"name": "sidekick-dual-enhanced", "version": "4.0.0"}
            }
        elif method == "tools/list":
            resp["result"] = {"tools": server.list_tools()}
        elif method == "tools/call":
            content = server.call_tool(req["params"]["name"], req["params"]["arguments"])
            resp["result"] = {"content": content}
        else:
            return None
            
        return resp
    except Exception as e:
        logger.error(f"Error handling request: {e}", exc_info=True)
        sys.stderr.write(f"Server Error: {e}\n")
        return None

if __name__ == "__main__":
    # Server starting
    sys.stderr.write("DEBUG: Server starting...\n")
    server = FlashSidekickServer()
    while True:
        try:
            line = sys.stdin.readline()
            if not line: break
            
            resp = handle_request(server, line)
            if resp: 
                print(json.dumps(resp))
                sys.stdout.flush()
            else:
                pass
        except KeyboardInterrupt:
            break
        except Exception as e:
            sys.stderr.write(f"Fatal Loop Error: {e}\n")
            break
