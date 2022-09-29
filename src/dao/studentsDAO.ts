import { MongoClient } from "mongodb"

let client: MongoClient

export default class StudentDAO {
  static async injectDB(connection: MongoClient) {
    if (client instanceof MongoClient) return

    client = connection
  }

  static async getPaginatedStudents({ searchQuery = "", page = 0, size = 25 }) {
    return { searchQuery, page, size }
  }
}
