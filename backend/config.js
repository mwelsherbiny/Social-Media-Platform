import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? ".env.development"
      : ".env.production",
});
