interface TextResult {
  "type": "text";
  "text": string;
}

interface MCPError {
  "code": number;
  "message": string;

}

interface ResourceNotFoundError extends MCPError {
  "code": 404;
  "message": "Resource not found";
}

interface InvalidFileLocation extends MCPError {
  "code": 500;
}

interface Point3D {
  "x": number;
  "y": number;
  "z": number;
}

interface TextResult_2 {
  "type": "text";
  "text": string;
}

interface Tools {
  /**
   * Get an item value.
   **/
  getItem(id: string): TextResult | ResourceNotFoundError;

  /**
   * Set an item value.
   **/
  setItem(id_2: string, value: string): TextResult | ResourceNotFoundError;

  /**
   * Write content to a file at the specified path.
   **/
  writeFile(path: string, content: string): TextResult | InvalidFileLocation;

  /**
   * Get the distance between two points in 3D space.
   **/
  getDistance(p1: Point3D, p2: Point3D): TextResult;


  getPoint(): TextResult_2;
}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}