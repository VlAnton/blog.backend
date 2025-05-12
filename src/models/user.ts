// models/User.ts

import { Model, DataTypes, Sequelize, Optional } from 'sequelize'

// Описываем пля пользователя
export interface UserAttributes {
  id: number
  username: string
  email: string
  password: string
  roleId: number
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

// Класс модели с типами
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public roleId!: number

  // timestamps (если нужны)
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// Функция инициализации модели
export function initUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      timestamps: true,
    }
  )

  return User
}
