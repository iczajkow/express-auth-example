import passport from "passport";
import { Express } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./prisma-client";
import bcrypt from "bcrypt";

export const initPassport = (app: Express) => {
  passport.use(
    "signup",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            return done(null, false, { message: "Password is not correct" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: "TOP_SECRET",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );

  app.use(passport.initialize());
};
