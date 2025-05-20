import "@typespec/http";

using Http;

/**
 * API for retrieving news articles from NewsData.io
 */
@service(#{ title: "NewsData.io API" })
@server("https://newsdata.io/api/1")
@useAuth(ApiKeyAuth<ApiKeyLocation.header, "X-ACCESS-KEY">)
namespace NewsDataioAPI;

model NewsResponse {
  status?: string;
  totalResults?: integer;
  results?: Article[];
  nextPage?: string;
}

model Article {
  creator?: string[];
  title?: string;
  keywords?: string[];
  description?: string;
  link?: string;
  pubDate?: utcDateTime;
  pubDateTZ?: string = "UTC";
  content?: string;
}

/**
 * Provides access to the latest and breaking news. The news articles are sorted by the published date. The news articles are up to the past 48 hours.
 */
@route("/latest")
@get
@summary("Retrieve the latest and breaking news")
op getLatestNews(
  /**
   * Search news articles for specific keywords or phrases present in the news title, content, URL, meta keywords and meta description. The value must be URL-encoded and the maximum character limit permitted is 100 characters.
   */
  @query q?: string,

  /**
   * Search the news articles for a specific language. You can add up to 5 languages in a single query. For example: zh,en.
   */
  @query language?: string,

  /**
   * Search the news articles from a specific country. You can add up to 5 countries in a single query.
   */
  @query country?: string,
): NewsResponse;
