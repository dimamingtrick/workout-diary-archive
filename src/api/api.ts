import { ApiCall, ErrorResponse } from "../models/auth.model";

const apiUrl = process.env.REACT_APP_API_URL;

class Api {
  async _call({ url, method = "GET", body = null }: ApiCall) {
    const token = localStorage.getItem("token");
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...token ? { token } : {}
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${apiUrl}/${url}`, options);
      const responseBody = await response.json();

      if (!response.ok) {
        return Promise.reject(new ErrorResponse({
          body: responseBody,
          message: responseBody.message,
          status: response.status
        }));
      }

      return responseBody;
    } catch (err) {
      throw new ErrorResponse({
        body: err.message,
        status: 500,
        message: err.message
      });
    }
  }

  get(url: string): Promise<any> {
    return this._call({ url });
  }

  post(url: string, body: any): Promise<any> {
    return this._call({ url, method: "POST", body });
  }

  put(url: string, body: any): Promise<any> {
    return this._call({ url, method: "PUT", body });
  }

  delete(url: string, body?: any): Promise<any> {
    return this._call({ url, method: "DELETE", body });
  }
}

export default new Api();
