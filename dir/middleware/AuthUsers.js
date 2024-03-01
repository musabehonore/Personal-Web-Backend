"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticateUser = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'a03e10a4e39a1ea26f741d78cc82478096037016cd5a3c9b1952e45123546162'
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (jwtPayload, done) => {
    return done(null, jwtPayload);
}));
const authenticateUser = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
            return res.status(401).json({ message: 'You are unauthenticated' });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authenticateUser = authenticateUser;
const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
