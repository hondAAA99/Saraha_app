import crypto from "node:crypto";
import dotenv from "dotenv";

export function encrypt(data) {
  const iv = crypto.randomBytes(Number(process.env.SECRET_IV_LENGTH));

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.SECRET_ENCRYPTION_KEY,
    iv,
  );

  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypt ;
}
