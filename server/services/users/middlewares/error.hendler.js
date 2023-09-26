export default function errorHandler(error, req, res, next) {
  console.log(error);
  let status = 500;
  let message = 'internal server error';
  switch (error.name) {
    case 'Document failed validation':
      status = 400;
      message = 'Invalid Input';
      return res.status(status).json({ message });
    default:
      res.status(status).json(error);
  }
}
