import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IUser } from '../types/userType';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: `${process.env.JWT_SECRET}`
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload: IUser, done) => {
  return done(null, jwtPayload);
}));

export const authenticateUser = (req: any, res: any, next: any) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (!user) {
      return res.status(401).json({ message: 'You are unauthenticated' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const authorizeAdmin = (req: any, res: any, next: any) => {
  const user = req.user as IUser;

  if (!user || user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  next();
};