import express from 'express';

import { getPosts, createPost} from '../controllers/post.controller.js';

const router = express.Router();

router.get('/getrecipe', getPosts);

router.post('/createRecipe', createPost);



export default router;