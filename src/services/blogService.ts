import IBlog from '../routes/models/interfaces/blogInterface'
import blogs from '../routes/models/blogModel'

class BlogService {
  private blogs: IBlog[] = blogs

  getAllBlogs(): IBlog[] {
    return this.blogs
  }

  getBlogById(id: number): IBlog | undefined {
    return this.blogs.find((blog) => blog.id === id)
  }

  deleteBlogById(id: number): IBlog | undefined {
    const indexToDelete = this.blogs.findIndex((blog) => blog.id === id)

    if (indexToDelete < 0) return undefined

    const deletedProduct = this.blogs.splice(indexToDelete, 1)
    return deletedProduct[0]
  }
}

export default new BlogService()
