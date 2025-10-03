export class ForbiddenException extends Error {
  public readonly code = 403;

  constructor(message = 'Forbidden Exception') {
    super(message);
  }
}
