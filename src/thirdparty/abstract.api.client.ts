import { HttpService } from '@nestjs/common';
import { AxiosResponse, Method } from 'axios';

export abstract class AbstractApiClient {
  constructor(protected readonly httpService: HttpService) {}

  protected abstract getBaseRequestURL(): string;

  async callRequest<T>(
    requestUri: string,
    method: Method,
    headers?: any,
    params?: any,
    request?: any,
  ): Promise<T> {
    const url: string = this.getBaseRequestURL() + requestUri;
    let axiosResponse: AxiosResponse<T> = null;

    axiosResponse = await this.httpService
      .request({
        url: this.getBaseRequestURL() + requestUri,
        method: method,
        headers: headers,
        params: params,
        data: request,
      })
      .toPromise();

    if (axiosResponse) {
      return axiosResponse.data;
    }

    return null;
  }
}
