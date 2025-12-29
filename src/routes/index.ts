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
import { createRole, deleteRole, getRoleByID, getRoles } from '@/routes/role'

const router = express.Router()

router.get('/posts/', getPosts)
router.get('/posts/count', getPostsTotalCount)
router.post('/posts/', createPost)
router.delete('/posts/:id', deletePost)
router.put('/posts/:id', updatePost)
router.get('/posts/:id', getPostById)

router.post('/roles/', createRole)
router.get('/roles/', getRoles)
router.get('/roles/:id', getRoleByID)
router.delete('/roles/:id', deleteRole)

router.post('/login/', login)
router.post('/register/', register)

export default router
