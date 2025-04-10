import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getItemParameters, setItemParameters, writeFileParameters, getDistanceParameters, getPointParameters, getItemReturnType, setItemReturnType, writeFileReturnType, TextResult, TextResult_2 } from "./types.js";
import { toolHandler } from "./tools.js";

const server = new Server(
  {
    name: "My MCP Server",
    version: "1.0.0",
  },
  {
    capabilities: {},
  }
)

server.setRequestHandler(
  ListToolsRequestSchema,
  async function listTools(request) {
    return {
      tools: [
        {
          name: "getItem",
          description: "Get an item value.",
          inputSchema: zodToJsonSchema(getItemParameters),
        },
        {
          name: "setItem",
          description: "Set an item value.",
          inputSchema: zodToJsonSchema(setItemParameters),
        },
        {
          name: "writeFile",
          description: "Write content to a file at the specified path.",
          inputSchema: zodToJsonSchema(writeFileParameters),
        },
        {
          name: "getDistance",
          description: "Get the distance between two points in 3D space.",
          inputSchema: zodToJsonSchema(getDistanceParameters),
        },
        {
          name: "getPoint",
          description: "",
          inputSchema: zodToJsonSchema(getPointParameters),
        }
      ],
    };
  }
)

server.setRequestHandler(
  CallToolRequestSchema,
  async function callTool(request) {
    const name = request.params.name;
    const args = request.params.arguments;
    switch (name) {
      case "getItem": {
        const parsed = getItemParameters.safeParse(args);
        if (!parsed.success) {
          throw new Error("Invalid parameters for getItem: " + parsed.error);
        }
        const result = toolHandler.getItem(parsed.data.id);
        const returnParsed = getItemReturnType.safeParse(result);
        if (!returnParsed.success) {
          throw new Error("Invalid return type for getItem: " + returnParsed.error);
        };
        return {
          content: returnParsed.data,
        };
      }

      case "setItem": {
        const parsed = setItemParameters.safeParse(args);
        if (!parsed.success) {
          throw new Error("Invalid parameters for setItem: " + parsed.error);
        }
        const result = toolHandler.setItem(parsed.data.id, parsed.data.value);
        const returnParsed = setItemReturnType.safeParse(result);
        if (!returnParsed.success) {
          throw new Error("Invalid return type for setItem: " + returnParsed.error);
        };
        return {
          content: returnParsed.data,
        };
      }

      case "writeFile": {
        const parsed = writeFileParameters.safeParse(args);
        if (!parsed.success) {
          throw new Error("Invalid parameters for writeFile: " + parsed.error);
        }
        const result = toolHandler.writeFile(
          parsed.data.path,
          parsed.data.content
        );
        const returnParsed = writeFileReturnType.safeParse(result);
        if (!returnParsed.success) {
          throw new Error("Invalid return type for writeFile: " + returnParsed.error);
        };
        return {
          content: returnParsed.data,
        };
      }

      case "getDistance": {
        const parsed = getDistanceParameters.safeParse(args);
        if (!parsed.success) {
          throw new Error("Invalid parameters for getDistance: " + parsed.error);
        }
        const result = toolHandler.getDistance(parsed.data.p1, parsed.data.p2);
        const returnParsed = TextResult.safeParse(result);
        if (!returnParsed.success) {
          throw new Error("Invalid return type for getDistance: " + returnParsed.error);
        };
        return {
          content: returnParsed.data,
        };
      }

      case "getPoint": {
        const result = toolHandler.getPoint();
        const returnParsed = TextResult_2.safeParse(result);
        if (!returnParsed.success) {
          throw new Error("Invalid return type for getPoint: " + returnParsed.error);
        };
        return {
          content: returnParsed.data,
        };
      }
    };
    return { content: [{ type: "text", text: "Unknown tool" }] };
  }
)