import { setToolHandler } from "../tsp-output/typespec-mcp-server-js/tools.js";
setToolHandler({
  getItem(id) {},
  setItem(id_2, value) {},
  getPoint() {},
  writeFile(path, content) {},

  getDistance(p1, p2) {
    return {
      type: "text",
      text: `Distance between ${p1} and ${p2} is ${0}`,
    };
  },
});
