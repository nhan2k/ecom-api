import { ErrorObject } from 'ajv';
import { Response } from 'express';
class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

class HttpExceptionMiddleware extends Error {
  public status: number;
  public message: string;
  public error: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined;

  constructor(status: number, message: string, error: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

class HttpResponse {
  public status: number;
  public data: Array<any> | Object;

  constructor(status: number, data: any) {
    this.status = status;
    this.data = {
      isSuccess: status >= 200 && status <= 299 ? true : false,
      data: data,
    };
  }

  sendResponse(res: Response) {
    res.status(this.status).json(this.data);
  }
}

export { HttpException, HttpExceptionMiddleware, HttpResponse };
