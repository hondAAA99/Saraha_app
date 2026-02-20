import crypto from "node:crypto";
import {
  SECRET_ENCRYPTION_ALGO,
  SECRET_ENCRYPTION_KEY,
  SECRET_IV_LENGTH,
} from "../../../../config/env.services.js";

export function encrypt(data) {
  const iv = crypto.randomBytes(SECRET_IV_LENGTH);

  const cipher = crypto.createCipheriv(
    SECRET_ENCRYPTION_ALGO,
    SECRET_ENCRYPTION_KEY,
    iv,
  );

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export const decrypt = (cipherText) => {
  const [hexiv, cipherdata] = cipherText.split(":");
  const iv = Buffer.from(hexiv, "hex");

  const decipher = crypto.createDecipheriv(
    SECRET_ENCRYPTION_ALGO,
    SECRET_ENCRYPTION_KEY,
    iv,
  );
  let decrypt = decipher.update(cipherdata, "hex", "utf8");
  decrypt += decipher.final("utf-8");

  return decrypt;
};
