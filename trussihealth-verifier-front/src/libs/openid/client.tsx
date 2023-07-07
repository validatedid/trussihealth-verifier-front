import * as config from "../../config";

// @ts-ignore
import { JSO } from "jso-2";

export class OpenIDClient {
  private static _instance: OpenIDClient;
  private provider: JSO;
  private client: JSO;

  private constructor() {
    let configFile = {
      client_id: config.OPENID.CLIENT_ID,
      token: config.OPENID.IDENTITY_PROVIDER + "/oauth2/token",
      authorization: config.OPENID.IDENTITY_PROVIDER + "/oauth2/auth",
      redirect_uri: config.OPENID.REDIRECT_CALLBACK_LOGIN,
      response_type: "code",
      debug: true,
      request: "324234324",
    };
    this.client = new JSO(configFile);

    const configFileLogin = {
      client_id: config.OPENID.CLIENT_ID,
      token: config.OPENID.IDENTITY_PROVIDER + "/oauth2/token",
      authorization: config.OPENID.IDENTITY_PROVIDER + "/oauth2/auth",
      redirect_uri: config.OPENID.REDIRECT_CALLBACK_LOGIN,
      response_type: "code",
      debug: true,
      request: "324234324",
    };
    this.provider = new JSO(configFileLogin);
  }

  public static getInstance(): OpenIDClient {
    return this._instance || (this._instance = new this());
  }

  public getClient(): any {
    return this.client;
  }

  public getProvider(): any {
    return this.provider;
  }
}
