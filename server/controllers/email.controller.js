import User from "../models/user.model.js";
import { generateVerifyEmailLink } from "../utils/generateVerifyEmailLink.js";
import { sendMailTransporter } from "../utils/sendMailTransporter.js";

export const sendEmailVerification = async (email) => {
  if (!email) {
    throw new Error("Email is required to send verification email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User doesn't exist");
  }

  if (user.emailVerified) {
    throw new Error("Email already verified");
  }

  const verificationUrl = await generateVerifyEmailLink(email);

  if (!verificationUrl) {
    throw new Error("Unable to generate verification URL");
  }

  const mailOptions = {
    from: "noreply@illuminateit.us",
    to: email,
    subject: "Verify your email address",
    text: `Please verify your email address by clicking on the following link: ${verificationUrl}`,
  };

  const transporter = sendMailTransporter();
  await transporter.sendMail(mailOptions);
};
