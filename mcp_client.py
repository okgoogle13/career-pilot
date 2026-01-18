import sys
import json
import subprocess

def call_mcp_tool(server_path, tool_name, arguments):
    # Construct the JSON-RPC request
    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": tool_name,
            "arguments": arguments
        }
    }
    
    # Run the server process, send request, read response
    process = subprocess.Popen(
        [sys.executable, server_path],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    stdout, stderr = process.communicate(input=json.dumps(request) + "\n")
    
    if stderr:
        print(f"Server Error: {stderr}", file=sys.stderr)
        
    try:
        response = json.loads(stdout)
        if "result" in response and "content" in response["result"]:
             # The content is a list of objects like {"type": "text", "text": "..."}
             # We want to extract the text from the first item
             content_list = response["result"]["content"]
             if content_list and len(content_list) > 0:
                 print(content_list[0]["text"])
             else:
                 print("{}") # Empty JSON if no content
        else:
             print(f"Error in response: {response}")
    except json.JSONDecodeError:
        print(f"Failed to decode response: {stdout}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 mcp_client.py <server_path> <tool_name> <args_json>")
        sys.exit(1)
        
    server_path = sys.argv[1]
    tool_name = sys.argv[2]
    try:
        args = json.loads(sys.argv[3])
    except:
        print("Invalid JSON arguments")
        sys.exit(1)
        
    call_mcp_tool(server_path, tool_name, args)
