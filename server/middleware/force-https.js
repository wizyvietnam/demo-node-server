export const forceHttps = (req, res, next) => {
    const development = process.env.NODE_ENV=== 'development' || process.env.NODE_ENV === 'test';
    if (req.headers['x-forwarded-proto'] === 'https' || development) {
      next();
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  }