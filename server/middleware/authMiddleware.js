import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/GenerateAccessTokens.js";
import User from "../models/user.model.js";

const checkAuthToken = async (req, res, next) => {
  try {
    const authToken = req.cookies["react_notes_access_token"];
    const refreshToken = req.cookies["react_notes_refresh_token"];

    if (!authToken) {
      console.log("No Auth Token, checking for Refresh Token");

      if (!refreshToken) {
        console.log("No Refresh Token");
        return res
          .status(401)
          .json({ message: "No authentication token provided" });
      }

      try {
        const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const user = await User.findById(refreshDecoded.userId);
        if (!user) {
          console.log("User not found with Refresh Token");
          return res.status(404).json({ message: "User not found" });
        }

        console.log("Refresh Token valid, generating new Auth Token");
        generateAccessToken(user, res);

        // Set the refreshed user info in the request
        req.user = { userId: user._id, userRole: user.userRole };

        return next();
      } catch (refreshErr) {
        console.log("Invalid Refresh Token");
        return res
          .status(401)
          .json({ message: "Session expired, please log in again" });
      }
    }

    // Verify the auth token
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      req.user = decoded; // Store the decoded user info in req.user
      console.log("Auth Token valid");
      return next();
    } catch (err) {
      console.log("Invalid Auth Token");
      if (err.name !== "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Invalid authentication token" });
      }

      console.log("Auth Token Expired, checking for Refresh Token");
      if (!refreshToken) {
        console.log("No Refresh Token");
        return res
          .status(401)
          .json({ message: "Session expired, please log in again" });
      }

      try {
        const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const user = await User.findById(refreshDecoded.userId);
        if (!user) {
          console.log("User not found with Refresh Token");
          return res.status(404).json({ message: "User not found" });
        }

        console.log("Refresh Token valid, generating new Auth Token");
        generateAccessToken(user, res);

        // Set the refreshed user info in the request
        req.user = { userId: user._id, userRole: user.userRole };

        next();
      } catch (refreshErr) {
        console.log("Invalid Refresh Token");
        return res
          .status(401)
          .json({ message: "Session expired, please log in again" });
      }
    }
  } catch (error) {
    console.error("Error in checkAuthToken middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkAuthToken;
