export class BadRequestException extends Error {
  public readonly code = 400;

  constructor(message = 'Bad Request Exception') {
    super(message);
  }
}
