// utils/md5.ts
import crypto from "crypto";

export const generateMD5Hash = (data: string): string => {
  return crypto.createHash("md5").update(data).digest("hex");
};
