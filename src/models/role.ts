import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IRole {
  name: string
  userId?: number
}

export const roleModel: ModelAttributes<Model, IRole> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  userId: {
    type: DataType.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}
