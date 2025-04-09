import { Request, Response } from 'express'
import { Post, PostBLock } from '@/db/db-client'
import websocket from '../../../websocket'
import formidable from 'formidable'
import { getNewFilePath, saveImage } from '@/helpers/saveImage'

export const getPosts = async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit) || 6
    const offset = Number(req.query.offset) || 0
    const posts = await Post.findAll({
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    })
    res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const postBlocks = await PostBLock.findAll({
      where: {
        postId: id,
      },
    })
    res.status(200).json({
      post,
      postBlocks,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const getPostsTotalCount = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.count()
    res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const createPost = async (req: Request, res: Response) => {
  const form = formidable({})
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: err.message })
    }
    try {
      const title = fields.title && fields.title[0]
      const isPublished = fields.isPublished && fields.isPublished[0]
      const content = fields.content && fields.content[0]
      const photo = files.photo && files.photo[0]
      let photoPath
      if (photo) {
        await saveImage(photo, res)
        photoPath = getNewFilePath(photo?.originalFilename)
      }
      const photoPathArr = photoPath?.split('/')
      if (!photoPathArr) {
        throw new Error('Error while loading image')
      }
      const newImageName = photoPathArr[photoPathArr?.length - 1]

      const post = await Post.create({
        title,
        content,
        photo: newImageName || null,
        isPublished,
      })
      websocket.broadcastNewPost(post)
      res.status(201).json(post)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Server unknown error' })
      }
    }
  })
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await Post.findByPk(id)
    if (topic) {
      await topic.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await Post.findByPk(id)
    if (post) {
      await post.update(req.body)
      res.json(post)
    } else {
      res.status(404).json({ error: 'Topic not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
