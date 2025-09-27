export class ConflictEmailException extends Error {
  public readonly code = 409;

  constructor(message = 'Conflict Email Exception') {
    super(message);
  }
}
