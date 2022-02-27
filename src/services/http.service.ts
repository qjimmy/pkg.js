import { Frozen } from 'src/decorators';
import { Http } from 'src/types/http';

interface WithQueryMetadata extends RequestInit {
  query?: {
    [key: string]: string | number;
  };
}

type RequestMetadata = {
  method: Http.Methods;
  path: RequestInfo;
  meta?: WithQueryMetadata;
};

@Frozen()
export class HttpService {
  private readonly defaultHeaders = {
    'Content-Type': 'application/json',
  };

  private static readonly instance: HttpService = new HttpService();

  private constructor() {}

  public static getInstance() {
    return this.instance;
  }

  /**
   * Inner method to reuse the logic of a basic fetch. The JSON response
   * failure is determined whether the HTTP code is in the range of 400.
   * This can be determined with the "ok" boolean and should be thrown
   * as an error to be handled in a try-catch clause instead of an if
   * statement.
   *
   * @param requestMetadata An Object containing the HTTP method,
   * the request resource path and the metadata which includes headers, body, etc.
   *
   * @returns A promise holding the response.
   */
  private async httpRequest<T = any>({
    method,
    path,
    meta = {},
  }: RequestMetadata): Promise<T> {
    return fetch(path, {
      ...meta,
      method,
      headers: {
        ...this.defaultHeaders,
        ...meta?.headers,
      },
    }).then(async (res: Response) => {
      if (res.status >= 500) throw res.statusText;

      const response = (await res.json()) as T;

      if (!res.ok) {
        throw response;
      }
      return response;
    });
  }

  private async httpHeader({
    method,
    path,
    meta = {},
  }: RequestMetadata): Promise<Headers> {
    return fetch(path, {
      ...meta,
      method,
      headers: {
        ...this.defaultHeaders,
        ...meta?.headers,
      },
    }).then((res: Response) => res.headers);
  }

  private buildUrlQuery(query?: { [key: string]: string | number }): string {
    return query
      ? Object.keys(query)
          .reduce((accumulator, current) => {
            if (!query[current]) return accumulator;
            return `${accumulator}${current}=${query[current]}&`;
          }, '?')
          .slice(0, -1) // Remove trailing ampersand symbol
      : '';
  }

  public get<T = any>(
    path: RequestInfo,
    meta: WithQueryMetadata = {}
  ): Promise<T> {
    const endpoint = `${path}${this.buildUrlQuery(meta?.query)}`;

    return this.httpRequest<T>({
      method: Http.Methods.GET,
      path: endpoint,
      meta,
    });
  }

  public post<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({
      method: Http.Methods.POST,
      path,
      meta,
    });
  }

  public put<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.PUT, path, meta });
  }

  public delete<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.DELETE, path, meta });
  }

  public patch<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.PATCH, path, meta });
  }

  public head(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.HEAD, path, meta });
  }

  public option(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.OPTIONS, path, meta });
  }

  public connect(path: RequestInfo, meta?: RequestInit): Promise<Headers> {
    return this.httpHeader({ method: Http.Methods.CONNECT, path, meta });
  }

  public trace<T = any>(path: RequestInfo, meta?: RequestInit): Promise<T> {
    return this.httpRequest<T>({ method: Http.Methods.TRACE, path, meta });
  }
}
