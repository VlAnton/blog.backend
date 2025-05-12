import { postModel, postBlockModel, roleModel, initUserModel } from '@/models'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export const Post = sequelize.define('Post', postModel, {})
export const PostBLock = sequelize.define('PostBlock', postBlockModel, {})
export const User = initUserModel(sequelize)
export const Role = sequelize.define('Role', roleModel, {})

PostBLock.belongsTo(Post, { foreignKey: 'postId' })
Post.hasMany(PostBLock, { foreignKey: 'postId' })

User.belongsTo(Role, { foreignKey: 'roleId' })
Role.hasMany(User, { foreignKey: 'roleId' })

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
