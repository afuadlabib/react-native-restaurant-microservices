module.exports = (error, req, res, next) => {
  console.log(`=== Error Name: ${error.name} ===`);
  let status = 500;
  let message = 'Internal Server Error';
  let name = error.name || 'error';
  switch (error.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      name = error.name;
      message = error.errors[0].message;
      return res.status(status).json({ message, name });
    case 'invalid_input':
      status = 400;
      message = 'invalid input';
      return res.status(status).json({ message, name });
    case 'JsonWebTokenError':
      status = 401;
      message = 'invalid token';
      return res.status(status).json({ message, name });
    case 'forbidden':
      status = 403;
      message = 'un authorized';
      return res.status(status).json({ message, name });
    case 'not_found':
      status = 404;
      message = 'not found';
      return res.status(status).json({ message, name });
    default:
      res.status(status).json({ message, name });
  }
};
