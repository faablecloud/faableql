export class FaableQLError extends Error {
  isFaableQL: boolean;
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.isFaableQL = true;
  }
}
