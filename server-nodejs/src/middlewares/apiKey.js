export default function apiKey(req, res, next) {
  const clientKey = req.headers["x-api-key"];

  if (!clientKey) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  if (clientKey !== process.env.API_KEY) {
    return res.status(403).json({
      status: 403,
      message: "Access denied",
    });
  }

  next();
}
