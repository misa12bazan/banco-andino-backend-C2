// Error con código HTTP para responder 400, 401, 403, 404, etc.
export class HttpError extends Error {
  constructor(status, mensaje, detalles) {
    super(mensaje);
    this.status = status;
    this.detalles = detalles;
  }
}
