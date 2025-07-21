export default function checkPostBody(req, res, next) {
  if (req.method === "POST" && !req.body) {
    return res.status(400).json({ error: "POST request must have a body" });
  }

  next();
}
