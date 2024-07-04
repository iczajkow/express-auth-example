import { Router } from "express";
import AuthRouter from "./auth";
import ProfileRouter from "./profile";
import passport from "passport";

const router = Router();

router.use("/auth", AuthRouter);
router.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  ProfileRouter,
);

export default router;
