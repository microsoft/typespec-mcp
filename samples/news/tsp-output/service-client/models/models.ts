export type String = string;
export interface NewsResponse {
  status?: string
  totalResults?: number
  results?: Array<Article>
  nextPage?: string;
}
export type Integer = number;
export type Numeric = number;

export interface Article {
  creator?: Array<string>
  title?: string
  keywords?: Array<string>
  description?: string
  link?: string
  pubDate?: Date
  pubDateTz?: string
  content?: string;
}

export type UtcDateTime = Date;