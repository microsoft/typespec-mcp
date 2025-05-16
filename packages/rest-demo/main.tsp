import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

@service(#{ title: "Widget Service" })
@info(#{ version: "1.0.0" })
namespace WidgetService;

model Error {
  code: int32;
  message: string;
}

model Widget {
  id: string;
  weight: int32;
  color: "red" | "blue";
}

/**
 * List all the widgets.
 */
@tag("Widgets")
@route("/widgets")
@get
op list(): Body<Widget[]> | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Body = Error
>;

/**
 * Create a new widget.
 */
@tag("Widgets")
@route("/widgets")
@post
op create(@body body: Widget): Widget | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Body = Error
>;

/**
 * Remove a widget by id.
 */
@tag("Widgets")
@route("/widgets/{id}")
@delete
op remove(@path id: string): NoContentResponse | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Body = Error
>;

/**
 * Get a widget by id.
 */
@tag("Widgets")
@route("/widgets/{id}")
@get
op read(@path id: string): Widget | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Body = Error
>;

/**
 * Update a widget by id.
 */
@tag("Widgets")
@route("/widgets/{id}")
@patch(#{ implicitOptionality: true })
op update(@path id: string, @body body: Widget): Widget | GeneratedHelpers.DefaultResponse<
  Description = "An unexpected error response.",
  Body = Error
>;

/**
 * Analyze a widget by id.
 */
@tag("Widgets")
@route("/widgets/{id}/analyze")
@post
op analyze(@path id: string): {
  @header contentType: "text/plain";
  @body body: string;
} | GeneratedHelpers.DefaultResponse<Description = "An unexpected error response.", Body = Error>;

namespace GeneratedHelpers {
  @doc(Description)
  @error
  model DefaultResponse<Description extends valueof string = "", Body = void, Headers extends {} = {}> {
    @body body: Body;
    ...Headers;
  }
}
