import { postModel } from '@/models/post'
import { postBlockModel } from '@/models/postBlock'
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

Post.hasMany(PostBLock, { foreignKey: 'postId' })
PostBLock.belongsTo(Post, { foreignKey: 'postId' })

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
