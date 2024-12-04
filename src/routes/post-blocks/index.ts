import { Request, Response } from 'express'
import { PostBLock } from '@/db/db-client'
import formidable from 'formidable'
import { saveImage } from '@/helpers/saveImage'

export const getPostBlocks = async (_req: Request, res: Response) => {
  try {
    const posts = await PostBLock.findAll()
    res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const createPostBlock = async (req: Request, res: Response) => {
  const form = formidable({})
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: err.message })
    }
    try {
      const title = fields.title && fields.title[0]
      const content = fields.content && fields.content[0]
      const photo = files.photo && files.photo[0]
      if (photo) {
        await saveImage(photo, res)
      }
      const post = await PostBLock.create({ title, content, photo: photo?.originalFilename || null })
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

export const deletePostBlock = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await PostBLock.findByPk(id)
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

export const updatePostBlock = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const topic = await PostBLock.findByPk(id)
    if (topic) {
      await topic.update(req.body)
      res.json(topic)
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
