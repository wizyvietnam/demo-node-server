export const httpStatus = (req, res, next) => {
  // http code: 200
  res.ok = data => {
    return res.status(200).json({
      data: data
    });
  };

  // http code: 400
  res.badRequest = function (message) {
    return res.status(400).json({
      error: {
        code: 400,
        message: message
      }
    });
  };

  // http code: 401
  res.unauthorized = message => {
    return res.status(401).json({
      error: {
        code: 401,
        message: message
      }
    });
  };

  // http code: 404
  res.notFound = message => {
    return res.status(404).json({
      error: {
        code: 404,
        message: message
      }
    });
  };

  // http code: 500
  res.serverError = message => {
    return res.status(500).json({
      error: {
        code: 500,
        message: message
      }
    });
  };

  next();
};
