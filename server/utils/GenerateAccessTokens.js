import jwt from "jsonwebtoken";

const generateAccessToken = (user, res) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      userRole: user.userRole,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("react_notes_access_token", accessToken, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export default generateAccessToken;
