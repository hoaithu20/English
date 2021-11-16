import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractApiClient } from '../abstract.api.client';
import { Auth0CreateAccountRequest } from './requests/auth0-create-account.request';

@Injectable()
export class Auth0ApiClient extends AbstractApiClient {
  constructor(
    protected readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super(httpService);
  }

  protected getBaseRequestURL(): string {
    return this.configService.get('auth0Config').url;
  }

  async createAccount(accountRequest: Auth0CreateAccountRequest) {
    return await this.callRequest<Auth0CreateAccountRequest>(
      '/signup',
      'post',
      null,
      null,
      accountRequest,
    );
  }
}
