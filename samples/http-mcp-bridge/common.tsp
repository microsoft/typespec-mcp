import "typespec-mcp";
import "@typespec/http";

using Http;

namespace Github;

model PagingParams {
  /** The page number to retrieve */
  @pageSize @query page?: int32 = 30;

  /** The number of items per page */
  @pageIndex @query per_page?: int32 = 1;
}

model PagedResponse<T> {
  /** The items on the current page */
  @pageItems @body items: T[];

  @header links: LinkHeader<{
    @nextLink next?: url;
    @lastLink last?: url;
  }>;
}
