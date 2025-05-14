# TypeSpec MCP Server and Emitter

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-Install_TypeSpec_MCP_Server-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=TypeSpec%20MCP%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mcp-server-typespec%40latest%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_TypeSpec_MCP_Server-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=TypeSpec%20MCP%20Server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22mcp-server-typespec%40latest%22%5D%7D&quality=insiders)

The TypeSpec MCP Server implements the [MCP specification](https://modelcontextprotocol.io) to enable you to quickly build out your own MCP servers powered by [TypeSpec](https://typespec.io/).  We will also enable you to build REST APIs and other protocols supported by TypeSpec, though this is work in progress.

> Please note that this project is in Public Preview and implementation may significantly change prior to our General Availability.

## Overview

### What packages are in this repository?

Currently this repo contains the following packages:

- [mcp-server-typespec](https://github.com/bterlson/typespec-mcp/tree/main/packages/mcp-server-typespec) - an MCP server which assists in developing MCP extensions using TypeSpec.
- [typespec-mcp](https://github.com/bterlson/typespec-mcp/tree/main/packages/typespec-mcp) - a TypeSpec library for describing MCP servers, for example the `@tool` decorator.
- [typespec-mcp-server-js](https://github.com/bterlson/typespec-mcp/tree/main/packages/typespec-mcp-server-js) - A TypeSpec emitter that generates a server implementation in JavaScript for an MCP tool.
- [typespec-mcp-http-server-js](https://github.com/bterlson/typespec-mcp/tree/main/packages/typespec-mcp-http-server-js) - A TypeSpec emitter that generates a server implementation in JavaScript for calling a remote REST API.

## Currently Supported Tools

The TypeSpec MCP Server provides the following tools:

- `learnTypeSpec` - Initializes the model with information about how to understand and write TypeSpec.
- `init` - Scaffolds out a new project in the current working directory with example tool implementation.
- `compile` - Runs tsp compile to generate emitter assets
- `build` - Executes `npm run build` in the current project.


## Getting Started

The TypeSpec MCP Server requires Node.js to install and run the server. If you don't have it installed, follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### VS Code + GitHub Copilot

The TypeSpec MCP Server provides assistance with authoring TypeSpec to generate MCP resource implementations. It can be used alone or with the [TypeSpec VS Code extension](https://typespec.io/docs/introduction/editor/vscode/) in VS Code.

### Prerequisites
1. Install either the stable or Insiders release of VS Code:
   * [Stable release](https://code.visualstudio.com/download)
   * [Insiders release](https://code.visualstudio.com/insiders)
2. Install the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) extensions
3. Install [Node.js](https://nodejs.org/en/download) 22 or later
   * Ensure `node` and `npm` are in your path
4. Open VS Code in an empty folder

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
      "args": [
        "-y",
        "mcp-server-typespec@latest",
      ]
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