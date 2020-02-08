export interface SignUpInterface {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface ApiCall {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}


interface ErrorInterface {
  message?: string;
  status?: number;
  body?: any;
}
export class ErrorResponse {
  message?: string;
  status?: number;
  body?: any;

  constructor({
    message = "",
    status,
    body
  }: ErrorInterface) {
    this.message = message;
    this.status = status;
    this.body = body;
  }
}
