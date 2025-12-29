import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { Post } from '@/db/db-client'
import websocket from '../../../websocket'
import {
  textToMarkdown,
  markdownToHtml,
  htmlToText,
} from './utils/parseContent'
import { PostDto } from '@/models'

export const getPosts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 6
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0
    const search = req.query.search ?? ''
    const posts = await Post.findAll({
      limit,
      offset,
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        contentText: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [['updatedAt', 'DESC']],
    })
    res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
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
    if (!post) {
      throw new Error('Post not found')
    }
    res.status(200).json({
      post,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const getPostsTotalCount = async (req: Request, res: Response) => {
  try {
    const search = req.query.search ?? ''
    const posts = await Post.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
        contentText: {
          [Op.like]: `%${search}%`,
        },
      },
    })
    res.status(200).json(posts.length)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export async function createPost(req: Request, res: Response) {
  const dto = req.body as PostDto
  const contentMd = textToMarkdown(dto.contentText)
  const contentHtml = markdownToHtml(contentMd)
  const contentText = htmlToText(contentHtml)
  try {
    const post = await Post.create({
      title: dto.title,
      isPublished: dto.isPublished,

      contentMd,
      contentHtml,
      contentText,
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
}

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const post = await Post.findByPk(id)
    if (post) {
      await post.destroy()
      websocket.broadcastDeletePost(post.id)
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
