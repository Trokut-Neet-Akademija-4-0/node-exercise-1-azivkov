import IBlog from '../routes/models/interfaces/blogInterface'
import blogs from '../routes/models/blogModel'
import HttpError from '../utils/HttpError'

class BlogService {
  private blogs: IBlog[] = blogs

  getAllBlogs(): IBlog[] {
    return this.blogs
  }

  getBlogById(id: number): IBlog | undefined {
    const foundBlog = this.blogs.find((blog) => blog.id === id)
    if (!foundBlog) throw new HttpError(404, `Blog with id ${id} not found`)

    return foundBlog
  }

  deleteBlogById(id: number): IBlog | undefined {
    const indexToDelete = this.blogs.findIndex((blog) => blog.id === id)

    if (indexToDelete < 0)
      throw new HttpError(404, `Blog with id ${id} not found`)

    const deletedProduct = this.blogs.splice(indexToDelete, 1)
    return deletedProduct[0]
  }

  addNewBlog(blog: IBlog): IBlog {
    this.blogs.push(blog)
    return blog
  }
}

export default new BlogService()
