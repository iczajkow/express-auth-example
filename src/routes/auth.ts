import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { RefreshTokenSchema } from "../dtos/refresh-token";

const router = Router();

router.post("/register", async (req, res, next) => {
  passport.authenticate("signup", async (err: unknown, user: User) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: "Could not register" });
    }
    return res.status(200).json({ message: "Signup successful", user });
  })(req, res, next);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err: unknown, user: User) => {
    try {
      if (err || !user) {
        console.info("Could not authorize user");

        if (err) {
          console.error(err);
        }

        return res.status(401).json({ message: "Could not authorize user" });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET!, {
          expiresIn: "10m",
        });
        const refreshToken = jwt.sign(
          { user: body },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: "1d" },
        );

        return res.json({ token, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/refresh", (req, res) => {
  const refreshToken = RefreshTokenSchema.parse(req.body).refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const body = { id: user.id, email: user.email };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET!, {
        expiresIn: "10m",
      });

      return res.json({ token });
    },
  );
});

export default router;
