import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IPost {
  content: string
  title: string
  photo: string
  postId: number
}

export const postBlockModel: ModelAttributes<Model, IPost> = {
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
  postId: {
    type: DataType.INTEGER,
    allowNull: true
  }
}
