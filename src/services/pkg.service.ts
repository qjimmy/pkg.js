import { Frozen } from 'src/decorators';
import { PackageDetails, SearchResponse } from 'src/types/entities';
import { Http } from 'src/types/http';
import { HttpService } from './http.service';

interface SearchArgs {
  text: string;
  size?: string | number;
  from?: string | number;
}

@Frozen()
export class PackageService {
  private static readonly instance = new PackageService(
    HttpService.getInstance()
  );

  private constructor(private readonly httpService: HttpService) {}

  public static getInstance() {
    return this.instance;
  }

  async search(args: SearchArgs): Promise<SearchResponse> {
    return this.httpService.get<SearchResponse>(
      Http.BASE_URL.concat(Http.ENDPOINTS.SEARCH),
      {
        query: { ...args },
      }
    );
  }

  async getPackage(packageName: string): Promise<PackageDetails> {
    return this.httpService.get<PackageDetails>(
      Http.BASE_URL.concat(Http.ENDPOINTS.GET_PACKAGE).concat(packageName)
    );
  }
}

export const pkgService = PackageService.getInstance();
