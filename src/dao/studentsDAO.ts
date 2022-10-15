import { MongoClient } from "mongodb"

export default class StudentDAO {
  private static client: MongoClient

  static async injectDB(connection: MongoClient) {
    if (this.client instanceof MongoClient) return

    this.client = connection
  }

  static async getStudents({ searchQuery = "", page = 0, size = 25 }) {
    return { searchQuery, page, size }
  }
}
