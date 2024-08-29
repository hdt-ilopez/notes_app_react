import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmailVerification } from "./email.controller.js";
import generateAccessToken from "../utils/GenerateAccessTokens.js";
import generateRefreshToken from "../utils/GenerateRefreshTokens.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email or password missing" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Email or password incorrect" });
    }

    if (user.emailVerified === false) {
      await sendEmailVerification(user.email);
    }

    generateAccessToken(user, res);
    generateRefreshToken(user, res);

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.log(`Error in login controller`, error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const signup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !gender) {
    return res.status(400).json({ message: "Fill out all fields to signup" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      profilePicture: `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`,
      userRole: "user",
      emailVerified: false,
    });

    await newUser.save();
    sendEmailVerification(email);
    generateAccessToken(newUser, res);
    generateRefreshToken(newUser, res);

    return res.status(200).json({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      emailVerified: newUser.emailVerified,
    });
  } catch (error) {
    console.error(`Error in signup controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {};
export const forgotPassword = async (req, res) => {};
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  // Check if the token is provided
  if (!token) {
    return res.status(400).send(`
      <html>
        <body>
          <p>Token is required</p>
          <script>
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          </script>
        </body>
      </html>
    `);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });

    // Check if user exists
    if (!user) {
      return res.status(404).send(`
        <html>
          <body>
            <p>User not found</p>
            <script>
              setTimeout(() => {
                window.location.href = "/";
              }, 3000);
            </script>
          </body>
        </html>
      `);
    }

    // Check if the user's email is already verified
    if (user.emailVerified) {
      return res.status(400).send(`
        <html>
          <body>
            <p>Email is already verified</p>
            <script>
              setTimeout(() => {
                window.location.href = "/";
              }, 3000);
            </script>
          </body>
        </html>
      `);
    }

    // Update the user's emailVerified status
    user.emailVerified = true;
    await user.save();

    // Respond with success message
    res.status(200).send(`
      <html>
        <body>
          <p>Email verified successfully</p>
          <script>
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle JSON Web Token errors
      return res.status(400).send(`
        <html>
          <body>
            <p>Invalid or expired token</p>
            <script>
              setTimeout(() => {
                window.location.href = "/";
              }, 3000);
            </script>
          </body>
        </html>
      `);
    }
    // General error handling
    console.error(`Error verifying email: ${error.message}`);
    res.status(500).send(`
      <html>
        <body>
          <p>Internal server error</p>
          <script>
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          </script>
        </body>
      </html>
    `);
  }
};
