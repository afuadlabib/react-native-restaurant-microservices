export default (error, req, res, next) => {
  console.log(`=== Error Name: ${error.name} ===`);
  let status = 500;
  let message = 'Internal Server Error';
  switch (error.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = error.message;
      return res.status(status).json({ message });
    case 'invalid_input':
      status = 400;
      message = error.message;
      return res.status(status).json({ message });
    case 'validation_error':
      status = 400;
      message = error.message;
      return res.status(status).json({ message });
    case 'JsonWebTokenError':
      status = 401;
      message = 'invalid token';
      return res.status(status).json({ message });
    case 'forbidden':
      status = 403;
      message = 'un authorized';
      return res.status(status).json({ message });
    case 'not_found':
      status = 404;
      message = 'not found';
      return res.status(status).json({ message });
    default:
      res.status(status).json({ message });
  }
};
