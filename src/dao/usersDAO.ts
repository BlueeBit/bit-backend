import { Collection, MongoClient, WithId } from "mongodb"
import { InternalError } from "../config/ApiError"
import { UserRegister } from "../types/users"

export default class UsersDAO {
  private static client: MongoClient
  private static usersCollection: Collection

  public static async injectDB(connection: MongoClient) {
    if (this.client instanceof MongoClient) return undefined

    this.client = connection
    this.usersCollection = connection.db("admin").collection("users")
    this.makeUsersUnique()
  }

  private static async makeUsersUnique() {
    const fields = { email: 1 }

    try {
      await this.usersCollection.createIndex(fields, { unique: true })
    } catch (error) {
      throw new InternalError("Couldn't create the unique index")
    }
  }

  public static async register(user: UserRegister) {
    try {
      return await this.usersCollection.insertOne(user)
    } catch (error) {
      throw new InternalError("Couldn't register the user")
    }
  }

  public static async findUser(email: string): Promise<UserRegister | null> {
    const filter = { email: { $eq: email } }
    let user: UserRegister | null
    try {
      user = await this.usersCollection.findOne<WithId<UserRegister>>(filter)
    } catch (error) {
      throw new InternalError("Couldn't search for user")
    }

    return user
  }
}
