import { Request, Response } from 'express'
import { Role } from '@/db/db-client'

export const createRole = async (req: Request, res: Response) => {
  try {
    const name = req.query.name ? req.query.name : ''
    if (!name) {
      res.status(500).json({ error: 'Missing required fields' })
      return
    }
    const role = await Role.create({
      name,
    })
    res.status(200).json(role)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}

export const getRoleByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const role = await Role.findByPk(id)
    if (!role) {
      res.status(404).json({ error: 'Role not found' })
      return
    }
    res.status(200).json(role)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await Role.findAll()
    res.status(200).json(roles)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const role = await Role.findByPk(id)
    if (role) {
      await role.destroy()
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Role not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Server unknown error' })
    }
  }
}
