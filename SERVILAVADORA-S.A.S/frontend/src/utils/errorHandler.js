export function parseApiError(err) {
  if (!err) return 'Error desconocido';
  if (err.body?.message) return err.body.message;
  if (err.message) return err.message;
  return String(err);
}
