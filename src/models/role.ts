import { DataType, Model } from 'sequelize-typescript'
import { ModelAttributes } from 'sequelize/types'

export interface IRole {
  name: string
}

export const roleModel: ModelAttributes<Model, IRole> = {
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
}
