import { code, List, refkey } from "@alloy-js/core";
import { ClassDeclaration, ClassMethod, SourceFile, UsingDirective } from "@alloy-js/csharp";

export function ResponseHandlerFile() {
  return (
    <SourceFile path="ResponseHandler.cs">
      <List>
        <UsingDirective namespaces={[]} />
        <ResponseHandlerClass />
      </List>
    </SourceFile>
  );
}

export function ResponseHandlerClass() {
  const tRefKey = refkey();
  return (
    <ClassDeclaration name="ResponseHandler" public static typeParameters={{ T: tRefKey }}>
      <ClassMethod
        public
        static
        name="Handle"
        parameters={[{ name: "message", type: "System.ClientModel.Primitives.PipelineMessage" }]}
        returns={tRefKey}
      >
        {code`
            var response = message.Response ?? throw new InvalidOperationException("Expected a response in the message");
            if (response.Status > 299 || response.Status < 200)
            {
                throw new InvalidOperationException($"Http request failed with status code: {response.Status}. Content:\\n{response.Content}");
            }
            var result = response.Content.ToObjectFromJson<${tRefKey}>(${(<JsonSerializerOptions />)});
            if (result == null)
            {
                throw new InvalidOperationException("Failed to deserialize response to Gist[]");
            }

            return result;
        `}
      </ClassMethod>
    </ClassDeclaration>
  );
}

function JsonSerializerOptions() {
  return code`new System.Text.Json.JsonSerializerOptions(System.Text.Json.JsonSerializerDefaults.Web)`;
}
