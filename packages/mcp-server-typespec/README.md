# mcp-server-typespec

## Overview

This package provides an MCP server which assists in developing MCP extensions using TypeSpec.

### Installation

#### One-Click Install

Click one of these buttons to install the TypeSpec MCP Server for VS Code or VS Code Insiders.

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-Install_TypeSpec_MCP_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=TypeSpec%20MCP%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mcp-server-typespec%40latest%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_TypeSpec_MCP_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=TypeSpec%20MCP%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mcp-server-typespec%40latest%22%5D%7D&quality=insiders)

Once you've installed the TypeSpec MCP Server, make sure you select GitHub Copilot Agent Mode and refresh the tools list. To learn more about Agent Mode, visit the [VS Code Documentation](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode).

#### Manual Install

For a step-by-step installation, follow these instructions:

1. Add `.vscode/mcp.json`:

```json
{
  "servers": {
    "TypeSpec MCP Server": {
      "command": "npx",
      "args": ["-y", "mcp-server-typespec@latest"]
    }
  }
}
```

## Test the TypeSpec MCP Server

1. Open GitHub Copilot in VS Code and [switch to Agent mode](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)
2. You should see the TypeCpec MCP Server in the list of tools
3. Try a prompt that tells the agent to use a TypeSpec MCP Server, such as "init" to scaffold a new project.

## Troubleshooting

See [Troubleshooting guide](https://github.com/bterlson/typespec-mcp/blob/main/TROUBLESHOOTING.md) for help with common issues and logging.

## Contributing

We welcome contributions to the TypeSpec MCP Server! Whether you're fixing bugs, adding new features, or improving documentation, your contributions are welcome.

Please read our [Contributing Guide](https://github.com/bterlson/typespec-mcp/blob/main/CONTRIBUTING.md) for more information on how to contribute.

## Code of Conduct

This project has adopted the
[Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, see the
[Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.
