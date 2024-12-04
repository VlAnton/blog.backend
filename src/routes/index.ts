import express from 'express'
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPostsTotalCount,
} from '@/routes/posts'

const router = express.Router()

router.get('/posts/', getPosts)
router.get('/posts/count', getPostsTotalCount)
router.route('/posts/').post(createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)

export default router
