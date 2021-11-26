export class Response {
	status: string;
	message: string;
	description: string;

	constructor(status: string, message: string, description: string = "") {
		this.status = status;
		this.message = message;
		this.description = description;
	}
}

export class ExceptionResponse extends Response {
	exception: string;

	constructor(status: string, message: string, description: string, exception: string) {
		super(status, message, description);
		this.exception = exception;
	}
}

export class SuccessResponse extends Response {

	constructor(status: string, message: string, description: string = "") {
		super(status, message, description);
	}
}

export class UnauthorizedExceptionResponse extends Response {
	constructor(status: string, message: string, description: any = "") {
		super(status, message, description);
	}
}

export class NetworkExceptionResponse extends ExceptionResponse {
}
