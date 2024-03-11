"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const queriesController_1 = require("../controllers/queriesController");
const multer_1 = __importDefault(require("../middleware/multer"));
const usersController_1 = require("../controllers/usersController");
const AuthUsers_1 = require("../middleware/AuthUsers");
const cors_1 = __importDefault(require("cors"));
const router = express_1.default.Router();
const blogController = new blogController_1.BlogController();
const queriesController = new queriesController_1.QueriesController();
router.use((0, cors_1.default)());
//blogs......
router.get('/blogs', blogController.getAllBlogs);
router.post('/blogs', AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, multer_1.default.single("image"), blogController.createBlog);
router.get('/blogs/:id', blogController.getBlogById);
router.patch("/blogs/:id", AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, multer_1.default.any(), blogController.updateBlog);
router.delete("/blogs/:id", AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, blogController.deleteBlog);
// comments .....
router.get('/blogs/:id/comments', blogController.getComments);
router.post('/blogs/:id/comments', AuthUsers_1.authenticateUser, multer_1.default.any(), blogController.CreateComment);
router.patch('/blogs/:id/comments/:id', blogController.editCommentStatus);
// likes...........
router.post('/blogs/:id/like', blogController.likeBlog);
router.get('/blogs/:id/likes', blogController.getLikes);
//Queries.......
router.get('/queries', AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, queriesController.getAllQueries);
router.post('/queries', multer_1.default.any(), queriesController.createQuery);
router.get('/queries/:id', AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, queriesController.getQueryById);
router.delete('/queries/:id', AuthUsers_1.authenticateUser, AuthUsers_1.authorizeAdmin, queriesController.deleteQuery);
//Users routes......
router.post('/signup', multer_1.default.any(), usersController_1.createUser);
router.post('/login', multer_1.default.any(), usersController_1.loginUser);
exports.default = router;
