import { createGeneratedHelpersClientContext, type GeneratedHelpersClientContext, type GeneratedHelpersClientOptions } from "./api/generatedHelpersClient/generatedHelpersClientContext.js";
import { createWidgetServiceClientContext, type WidgetServiceClientContext, type WidgetServiceClientOptions } from "./api/widgetServiceClientContext.js";
import { analyze, type AnalyzeOptions, create, type CreateOptions, list, type ListOptions, read, type ReadOptions, remove, type RemoveOptions, update, type UpdateOptions } from "./api/widgetServiceClientOperations.js";
import type { Widget } from "./models/models.js";

export class WidgetServiceClient {
  #context: WidgetServiceClientContext
  generatedHelpersClient: GeneratedHelpersClient
  constructor(endpoint: string, options?: WidgetServiceClientOptions) {
    this.#context = createWidgetServiceClientContext(endpoint, options);
    this.generatedHelpersClient = new GeneratedHelpersClient(endpoint, options);
  }
  async list(options?: ListOptions) {
    return list(this.#context, options);
  };
  async create(body: Widget, options?: CreateOptions) {
    return create(this.#context, body, options);
  };
  async remove(id: string, options?: RemoveOptions) {
    return remove(this.#context, id, options);
  };
  async read(id: string, options?: ReadOptions) {
    return read(this.#context, id, options);
  };
  async update(id: string, body: Widget, options?: UpdateOptions) {
    return update(this.#context, id, body, options);
  };
  async analyze(id: string, options?: AnalyzeOptions) {
    return analyze(this.#context, id, options);
  }
}
export class GeneratedHelpersClient {
  #context: GeneratedHelpersClientContext

  constructor(endpoint: string, options?: GeneratedHelpersClientOptions) {
    this.#context = createGeneratedHelpersClientContext(endpoint, options);

  }

}