import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getForecast } from "./tools.js";
import { getForecastParameters } from "./schema.js";

export const server = new McpServer({
  name: "Open-Meteo Weather API",
  version: "1.0.0",
})

export const endpoint = process.env.ENDPOINT ?? "http://localhost:5000";

server.tool(
  "getForecast",
  "Get weather forecast for a specific location",
  getForecastParameters,
  getForecast
)