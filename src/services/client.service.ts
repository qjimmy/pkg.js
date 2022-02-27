import { Frozen } from 'src/decorators';
import { SearchResponse } from 'src/types/entities';
import { Http } from 'src/types/http';
import { HttpService } from './http.service';

interface SearchArgs {
  text: string;
  size?: string | number;
  from?: string | number;
}

@Frozen()
export class ClientService {
  private static readonly instance = new ClientService(
    HttpService.getInstance()
  );

  private constructor(private readonly httpService: HttpService) {}

  public static getInstance(): ClientService {
    return this.instance;
  }

  search(args: SearchArgs): Promise<SearchResponse> {
    return this.httpService.get<SearchResponse>(Http.CLIENT_ENDPOINTS.SEARCH, {
      query: { ...args },
    });
  }
}

export const clientService = ClientService.getInstance();
