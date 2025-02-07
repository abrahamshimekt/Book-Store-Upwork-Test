
// API response payload data format
class BaseApiResponse {
  constructor(data, message, errors, status, isSuccess) {
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isSuccess = isSuccess;
  }

  static success(payload, message,status) {
    return new BaseApiResponse({data:payload,message:message, errors:[], status:status, isSuccess:true});
  }

  static failure(message, errors, status) {
    return new BaseApiResponse({message:message, errors:errors, status:status,isSuccess:false});
  }
}

module.exports = BaseApiResponse;


