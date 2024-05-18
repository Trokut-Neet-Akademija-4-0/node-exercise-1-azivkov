// src/index.js
import express, { Express } from 'express'
import 'reflect-metadata'
import dataSource from './app-data-source'
import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import blogRoutes from './routes/blogRoutes'
import errorHandler from './middlewares/ErrorHandler'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err: string) => {
    console.error('Error during Data Source initialization:', err)
  })

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', homeRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/blog', blogRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
