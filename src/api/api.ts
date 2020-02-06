const apiUrl = process.env.REACT_APP_API_URL;

interface ApiCall {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

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
        return Promise.reject({
          statusText: response.statusText,
          status: response.status,
          body: responseBody
        });
      }

      return responseBody;
    } catch (err) {
      throw err;
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
