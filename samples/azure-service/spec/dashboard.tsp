import "@azure-tools/typespec-azure-core";
import "@azure-tools/typespec-azure-resource-manager";
import "@typespec/rest";
import "./models.tsp";

using Azure.ResourceManager;
using TypeSpec.Http;

namespace Test;
/**
 * The shared dashboard resource definition.
 */
model Dashboard is Azure.ResourceManager.TrackedResource<DashboardPropertiesWithProvisioningState> {
  ...ResourceNameParameter<Resource = Dashboard>;
}

@armResourceOperations
interface Dashboards {
  /**
   * Gets the Dashboard.
   */
  // get is ArmResourceRead<Dashboard>;
  @MCP.tool
  @route("/subscriptions/{subscriptionId}/providers/Test/dashboards")
  list(@path subscriptionId: string, @query("api-version") apiVersion: string): ResourceListResult<Dashboard>;

  //   /**
  //    * Creates or updates a Dashboard.
  //    */
  //   createOrUpdate is ArmResourceCreateOrReplaceSync<Dashboard>;

  //   /**
  //    * Updates an existing Dashboard.
  //    */
  //   @patch(#{ implicitOptionality: false })
  //   update is ArmCustomPatchSync<Dashboard, PatchableDashboard>;

  //   /**
  //    * Deletes the Dashboard.
  //    */
  //   delete is ArmResourceDeleteSync<Dashboard>;

  //   /**
  //    * Gets all the Dashboards within a resource group.
  //    */
  //   listByResourceGroup is ArmResourceListByParent<Dashboard>;

  //   /**
  //    * Gets all the dashboards within a subscription.
  //    */
  // listBySubscription is ArmListBySubscription<Dashboard>;
}
