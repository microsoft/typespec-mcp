import { code, Indent, join, List } from "@alloy-js/core";
import { type Authentication, type HttpOperation } from "@typespec/http";

export interface CreateClientPipelineProps {
  httpOp: HttpOperation;
}

export function CreateClientPipeline(props: CreateClientPipelineProps) {
  const policies = [props.httpOp.authentication && <AuthenticationPolicy auth={props.httpOp.authentication} />].filter(
    (x) => x,
  );
  return (
    <List>
      {`ClientPipeline.Create(`}
      <Indent>
        <List comma>
          {`new ClientPipelineOptions()`}
          {`System.Array.Empty<PipelinePolicy>()`}
          {policies.length > 0 ? code`new [] { ${join(policies)} }` : `System.Array.Empty<PipelinePolicy>()`}
          {`System.Array.Empty<PipelinePolicy>()`}
        </List>
      </Indent>
      {`)`}
    </List>
  );
}

export interface AuthenticationPolicyProps {
  auth: Authentication;
}

export function AuthenticationPolicy(props: AuthenticationPolicyProps) {
  const first = props.auth.options[0].schemes[0];
  switch (first.type) {
    case "apiKey":
      return code`ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential(Environment.GetEnvironmentVariable("APIKEY")), "${first.name}")`;
    case "http":
      if (first.scheme === "Bearer") {
        return code`ApiKeyAuthenticationPolicy.CreateHeaderApiKeyPolicy(new ApiKeyCredential($"Bearer {Environment.GetEnvironmentVariable("TOKEN")}"), "Authorization")`;
      }
      break;
    default:
      return `/* unsupported authentication type: ${first.type}*/`;
  }
}
