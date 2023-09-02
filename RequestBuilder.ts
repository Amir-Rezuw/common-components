import axios, { AxiosResponse, Method } from "axios";
// Create a new common interfaces file and include interface below inside that file
interface IKeyValue {
  key: string;
  value: string;
}
// Create a new enviornment file and include env object that has baseUrl property
const env = {
  baseUrl: "",
};
export default class RequsetBuilder {
  constructor(method?: Method, baseUrl?: string, url?: string) {
    if (method) {
      this.method = method;
    }
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
    if (url) {
      this.url = url;
    }
  }
  private url: string = "";
  private baseUrl: string = env.baseUrl;
  private method: Method = "GET";
  private body: any;
  private queryParams: IKeyValue[] = [];
  private defaultHeaders = <any>{};
  private headers: IKeyValue[] = [];
  private abortSignal?: AbortSignal;
  setMethod(method: Method): RequsetBuilder {
    this.method = method;
    return this;
  }

  addHeaders<T extends number | string>(key: string, value: T): RequsetBuilder {
    const stringValue = value.toString();
    this.headers?.push({ key, value: stringValue });
    return this;
  }
  setAbortSignal(signal: AbortSignal): RequsetBuilder {
    this.abortSignal = signal;
    return this;
  }
  setUrl(url: string): RequsetBuilder {
    this.url = url;
    return this;
  }
  setBody(body: any): RequsetBuilder {
    this.body = body;
    return this;
  }
  addQueryParam<T extends number | string>(
    key: string,
    value: T
  ): RequsetBuilder {
    const stringValue = value.toString();
    this.queryParams.push({ key, value: stringValue });
    return this;
  }
  async ExecuteRequest<T>(): Promise<AxiosResponse<T>> {
    let url = new URL(`${this.baseUrl}${this.url}`).toString();
    if (this.queryParams?.length) {
      url += "?";

      this.queryParams.forEach((item) => {
        url = url + `${encodeURI(item.key)}=${encodeURI(item.value)}&`;
      });
    }
    const result = await axios({
      method: this.method,
      headers: this.defaultHeaders,
      data: this.body,
      signal: this.abortSignal,
    });
    return result;
  }
}
