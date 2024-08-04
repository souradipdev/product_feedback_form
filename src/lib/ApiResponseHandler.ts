
export class ApiResponseHandler {
  data:  any ;
  success: boolean;
  message: string;

  constructor(success: boolean, message: string, data: any) {
    this.success = success
    this.message = message;
    this.data = data;
  }
}
