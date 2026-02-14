import crypto from "node:crypto";


export function encrypt(data) {
  const iv = crypto.randomBytes(Number(process.env.SECRET_IV_LENGTH));

  const cipher = crypto.createCipheriv(
    process.env.SECRET_ENCRYPTION_ALGO,
    process.env.SECRET_ENCRYPTION_KEY,
    iv,
  );

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");  
  return iv.toString("hex") + ":" + encrypted;
}

export const decrypt = (cipherText) => {
  const [ hexiv , cipherdata ] = cipherText.split(":");
  const iv = Buffer.from(hexiv,'hex');
  console.log(iv);
  

  const decipher = crypto.createDecipheriv(
    process.env.SECRET_ENCRYPTION_ALGO,
    process.env.SECRET_ENCRYPTION_KEY,
    iv,
  );
  let decrypt = decipher.update(cipherdata, "hex",'utf8');
  decrypt += decipher.final("utf-8");

  return decrypt ;
};
