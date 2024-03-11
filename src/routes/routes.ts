import express, { Router } from 'express';
import { BlogController } from '../controllers/blogController';
import { QueriesController } from '../controllers/queriesController';
import upload from '../middleware/multer';
import { createUser, loginUser } from '../controllers/usersController';
import { authenticateUser, authorizeAdmin } from '../middleware/AuthUsers';
import cors from 'cors';

const router: Router = express.Router();
const blogController = new BlogController();
const queriesController = new QueriesController();

router.use(cors());

//blogs......
router.get('/blogs', blogController.getAllBlogs);
router.post('/blogs',  authenticateUser, authorizeAdmin, upload.single("image"), blogController.createBlog);
router.get('/blogs/:id', blogController.getBlogById);
router.patch("/blogs/:id",authenticateUser, authorizeAdmin, upload.any(), blogController.updateBlog);
router.delete("/blogs/:id", authenticateUser, authorizeAdmin, blogController.deleteBlog);

// comments .....
router.get('/blogs/:id/comments', blogController.getComments);
router.post('/blogs/:id/comments',  upload.any(), blogController.CreateComment);
router.patch('/blogs/:id/comments/:id',  blogController.editCommentStatus);


// likes...........
router.post('/blogs/:id/like', blogController.likeBlog);
router.get('/blogs/:id/likes', blogController.getLikes);


//Queries.......
router.get('/queries',  authenticateUser, authorizeAdmin, queriesController.getAllQueries);
router.post('/queries', upload.any(), queriesController.createQuery);
router.get('/queries/:id', authenticateUser, authorizeAdmin, queriesController.getQueryById);
router.delete('/queries/:id', authenticateUser, authorizeAdmin, queriesController.deleteQuery);


//Users routes......
router.post('/signup', upload.any(), createUser);
router.post('/login', upload.any(), loginUser);

export default router;