import "typespec-mcp";
import "./main.tsp";

using MCP;

@@mcpServer(OpenMeteoWeatherAPI, #{ name: "Open-Meteo Weather API", version: "1.0.0" });
@@tool(OpenMeteoWeatherAPI.getForecast);