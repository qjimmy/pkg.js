export interface SearchEntry {
  package: Package;
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}

export interface SearchResponse {
  objects: Array<SearchEntry>;
  total: number;
  time: string;
}

export interface Developer {
  username: string;
  email: string;
}

export interface Repository {
  type: string;
  url: string;
  directory: string;
}

export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: Array<string>;
  date: string;
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  author?: {
    name: string;
  };
  publisher: Partial<Developer>;
  maintainers?: Array<Partial<Developer>>;
}

export interface PackageDetails {
  _id: string;
  _rev: string;
  name: string;
  description?: string;
  ['dist-tags']: {
    latest: string;
    next: string;
    experimental: string;
    beta: string;
    rc: string;
  };
  versions: {
    [version: string]: any;
  };
  maintainers: Array<Partial<Developer>>;
  repository: Repository;
  readme: string;
  readmeFilename: string;
  homepage: string;
  keywords?: Array<string>;
  bugs: {
    url: string;
  };
  license: string;
}

export interface LoaderState<T = any> {
  loading: boolean;
  error: any;
  data: T;
}
