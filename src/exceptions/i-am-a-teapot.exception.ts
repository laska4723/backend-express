export class IAmATeapotException extends Error {
  public readonly code = 418;

  constructor(message = 'I am a teapot') {
    super(message);
  }
}
