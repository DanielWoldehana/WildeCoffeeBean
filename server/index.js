import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const rawOrigin = process.env.CORS_ORIGIN;
const corsOrigin =
  rawOrigin && rawOrigin.length > 0
    ? rawOrigin.split(",").map((o) => o.trim())
    : "*";

app.use(helmet());
app.use(
  cors({
    origin: corsOrigin,
    credentials: corsOrigin === "*" ? false : true,
  })
);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
