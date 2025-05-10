import { Request, Response } from 'express'
import formidable from 'formidable'
import bcrypt from 'bcrypt'
import { User } from '@/db/db-client'

export const login = async (req: Request, res: Response) => {
  try {
    const form = formidable({})
    form.parse(req, async (err, fields) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      const email = fields.email && fields.email[0]
      const user = await User.findOne({
        where: {
          email,
        },
      })

      const plainPassword = fields.password && fields.password[0]
      if (!plainPassword) {
        res.status(500).json({ error: 'Missing password' })
        return
      }
      if (!user) {
        res.status(500).json({ error: 'User not found' })
        return
      }
      const isPasswordValid = await bcrypt.compare(plainPassword, user.password)
      if (!isPasswordValid) {
        res.status(500).json({ error: 'Invalid password' })
      }
      res.status(200).json({ user })
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const register = async (req: Request, res: Response) => {
  const form = formidable({})
  form.parse(req, async (err, fields) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    try {
      const email = fields.email && fields.email[0]
      const plainPassword = fields.password && fields.password[0]
      const username = fields.username && fields.username[0]
      if (!email || !plainPassword || !username) {
        res.status(500).json({ error: 'Missing required fields' })
        return
      }
      const password = await bcrypt.hash(plainPassword, 10)
      const existingUser = await User.findOne({
        where: {
          email,
        },
      })
      if (existingUser) {
        res.status(500).json({ error: 'User with this email already exists' })
        return
      }
      const user = await User.create({
        username,
        email,
        password,
      })
      res.status(201).json(user)
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Server unknown error' })
      }
    }
  })
}
