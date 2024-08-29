import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateVerifyEmailLink = (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL}?token=${token}`;

  return verificationUrl;
};
