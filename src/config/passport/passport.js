import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { getUserByIdService } from "../../services/user-services.js";
import "dotenv/config";

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req && req.cookies ? req.cookies["token"] : null;
    },
  ]),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(strategyConfig, async (jwtPayload, done) => {
    try {
      const user = await getUserByIdService(jwtPayload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
