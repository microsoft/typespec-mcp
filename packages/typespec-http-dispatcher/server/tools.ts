export interface Tools {}

export let toolHandler: Tools = undefined as any;

export function setToolHandler(handler: Tools) {
  toolHandler = handler;
}
