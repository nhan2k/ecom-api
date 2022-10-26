import { Response } from 'express';

enum HttpStatus {
  OK = 200,
  Created,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}
type status = 200 | 201 | 400 | 404 | 500;

class HttpResponse {
  public status: status;
  public data: Array<any> | Object;

  constructor(status: status, data: any) {
    this.status = status;
    this.data = {
      isSuccess: status >= 200 && status <= 299 ? true : false,
      data: data,
    };
  }

  sendResponse(res: Response) {
    return res.status(this.status).json(this.data);
  }
}

export { HttpResponse, HttpStatus };
