const credentials = (req, res, next) => {
  const allowedOrigins = ["http://localhost:5173",];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
