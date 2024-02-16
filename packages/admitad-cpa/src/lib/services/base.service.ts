export abstract class BaseService<T> {
  abstract validateRequestOptions(options: T): void;
  abstract createRequestUrl(options: T): string;
}
