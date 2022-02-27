const API_VERSION_PREFIX = process.env.NEXT_PUBLIC_API_VERSION_PREFIX;

export namespace Http {
  export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
  }

  export const ENDPOINTS = {
    SEARCH: '/-/v1/search',
    GET_PACKAGE: '/',
  };

  export const CLIENT_ENDPOINTS = {
    SEARCH: API_VERSION_PREFIX.concat('/search'),
  };
}
