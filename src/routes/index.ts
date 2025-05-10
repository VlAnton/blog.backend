import express from 'express'
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPostsTotalCount,
  getPostById,
} from '@/routes/posts'
import { login, register } from '@/routes/user'
import { createPostBlock, getPostBlocks } from '@/routes/post-blocks'

const router = express.Router()

router.get('/posts/', getPosts)
router.get('/posts/count', getPostsTotalCount)
router.post('/posts/', createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)
router.get('/posts/:id', getPostById)

router.get('/post-blocks/', getPostBlocks)
router.post('/post-blocks/', createPostBlock)

router.post('/login/', login)
router.post('/register/', register)

export default router
