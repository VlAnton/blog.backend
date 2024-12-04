import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IPost {
  content: string
  title: string
  photo: string
  isPublished: boolean
}

export const postModel: ModelAttributes<Model, IPost> = {
  content: {
    type: DataType.TEXT,
    allowNull: false,
  },
  title: {
    type: DataType.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataType.TEXT,
    allowNull: true,
  },
  isPublished: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
}
