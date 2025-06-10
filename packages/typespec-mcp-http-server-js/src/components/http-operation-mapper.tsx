import { List, type Children, type Refkey } from "@alloy-js/core";
import { MemberExpression, ObjectExpression, ObjectProperty } from "@alloy-js/typescript";
import type { ModelProperty } from "@typespec/compiler";
import type { HttpOperation, HttpProperty } from "@typespec/http";

export interface HttpOperationMapperProps {
  /** Http operation to call */
  op: HttpOperation;

  /** Refkey of the args array */
  argsRefkey: Refkey;

  /** Are the args passed as an array of positional arg or an option bag  */
  argsStyle?: "positional" | "named";
}

/**
 * Create a mapping of operation parameters(Array of parameters) to an http request(query, path, body, headers, etc.)
 */
export function HttpOperationMapper(props: HttpOperationMapperProps) {
  const parameters = props.op.operation.parameters;

  const propertyMap = new Map<ModelProperty, HttpProperty>();
  for (const prop of props.op.parameters.properties) {
    propertyMap.set(prop.property, prop);
  }

  const headers = new Map<string, Children>();
  const pathParams = new Map<string, Children>();
  const queryParams = new Map<string, Children>();
  const bodyParams = new Map<string, Children>();
  let body: Children | undefined;

  let index = 0;
  for (const parameter of parameters.properties.values()) {
    const httpProp = propertyMap.get(parameter);
    if (!httpProp) {
      throw new Error(`Expected to find http property for ${parameter.name}`);
    }
    const indexCp = props.argsStyle === "named" ? parameter.name : index;
    const accessor = <HttpPropertyAccessor refkey={props.argsRefkey} path={[indexCp, ...httpProp.path.slice(1)]} />;
    switch (httpProp.kind) {
      case "header":
        headers.set(httpProp.options.name, accessor);
        break;
      case "path":
        pathParams.set(httpProp.options.name, accessor);
        break;
      case "query":
        queryParams.set(httpProp.options.name, accessor);
        break;
      case "bodyProperty":
        queryParams.set(httpProp.property.name, accessor);
        break;
      case "body":
      case "bodyRoot":
        body = accessor;
        break;
      case "contentType":
      case "statusCode":
        // ignore
        break;
      case "multipartBody":
      case "cookie":
      default:
        throw new Error(`Unexpected http property kind ${httpProp.kind}`);
    }
    index++;
  }
  return (
    <ObjectExpression>
      <List comma>
        {headers.size > 0 && (
          <ObjectProperty name="headers">
            <ObjectExpression jsValue={headers} />
          </ObjectProperty>
        )}
        {pathParams.size > 0 && (
          <ObjectProperty name="pathParams">
            <ObjectExpression jsValue={pathParams} />
          </ObjectProperty>
        )}
        {queryParams.size > 0 && (
          <ObjectProperty name="queryParams">
            <ObjectExpression jsValue={queryParams} />
          </ObjectProperty>
        )}
        {(body || bodyParams.size > 0) && (
          <ObjectProperty name="body">
            {<ObjectExpression jsValue={{ value: body ?? bodyParams, contentType: "application/json" }} />}
          </ObjectProperty>
        )}
      </List>
    </ObjectExpression>
  );
}

export function HttpPropertyAccessor(props: { refkey: Refkey; path: (string | number)[] }) {
  return (
    <MemberExpression>
      <MemberExpression.Part refkey={props.refkey} />
      {props.path.map((x) => (
        <MemberExpression.Part quoteId={true}>{x}</MemberExpression.Part>
      ))}
    </MemberExpression>
  );
}
