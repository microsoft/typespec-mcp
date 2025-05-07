import { Refkey, refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { FunctionCallExpression, FunctionDeclaration } from "@alloy-js/typescript";
import { useMCPServerContext } from "../context/McpServer.js";

export interface RequestHandlerProps {
  /**
   * The name of the handler.
   */
  name: string;

  /**
   * A zod schema which describes the request body.
   */
  schema: Children;

  /**
   * The body of the request handler.
   */
  children: (key: Refkey) => Children;
}

/**
 * Emits a call to `server.setRequestHandler`. The `schema` prop should be a
 * reference to a zod schema (or an inline zod schema) that describes the
 * request body. The `children` is the body of the request handler.
 */
export function RequestHandler(props: RequestHandlerProps) {
  const requestParam = refkey();
  const {
    keys: { server, getToolHandler },
  } = useMCPServerContext();
  return (
    <FunctionCallExpression
      target={<>{server}.setRequestHandler</>}
      args={[
        props.schema,
        <FunctionDeclaration async name={props.name} parameters={[{ name: "request", refkey: requestParam }]}>
          {props.children(requestParam)}
        </FunctionDeclaration>,
      ]}
    />
  );
}
