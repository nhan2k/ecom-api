export interface IProductData {
  userId?: number;
  title?: string;
  metaTitle?: string;
  summary?: JSON;
  type?: number;
  price?: number;
  discount?: number;
  shop?: number;
  content?: JSON;
  publishedAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  slug?: string;
  sku?: string;
}
