import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IPost {
  contentText: string
  contentMd: string
  contentHtml: string
  title: string
  isPublished: boolean
}

export type PostDto = Omit<IPost, 'contentMd' | 'contentHtml'>

export const postModel: ModelAttributes<Model, IPost> = {
  title: {
    type: DataType.TEXT,
    allowNull: false,
  },

  isPublished: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  contentMd: {
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Markdown source',
  },

  contentHtml: {
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Rendered & sanitized HTML',
  },

  contentText: {
    type: DataType.TEXT,
    allowNull: false,
    comment: 'Plain text for search',
  },
}
