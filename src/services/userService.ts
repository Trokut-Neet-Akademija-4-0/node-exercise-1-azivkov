import Kupac from '../entities/Kupac'
import HttpError from '../utils/HttpError'

class UserService {
  async getUserById(id: number): Promise<Kupac> {
    const foundUser = await Kupac.findOne({
      relations: {
        adresa: true,
      },
      where: {
        id: id,
      },
    })
    if (!foundUser) throw new HttpError(404, `User with id ${id} not found`)
    return foundUser
  }
}

export default new UserService()
