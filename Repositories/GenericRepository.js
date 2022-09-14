export default class GenericRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async save(object) {
    const objects = await this.dao.save(object);
    return objects;
  }

  async update(object, id) {
    const objects = await this.dao.update(object, id);
    return objects;
  }

  async getById(id) {
    const object = await this.dao.getById(id);
    return object;
  }

  async getAll() {
    const objects = await this.dao.getAll();
    return objects;
  }

  async getRandom() {
    return await this.dao.getRandom();
  }

  async deleteById(id) {
    return await this.dao.deleteById(id);
  }

  async deleteAll() {
    return await this.dao.deleteAll();
  }
};
