import server from "./server"
import { DB_URI, LOCAL_DB_URI, MONGO_OPTIONS } from "./constants/database"
import { MongoClient, MongoNotConnectedError } from "mongodb"
import StudentDAO from "./dao/studentsDAO"
import { environment } from "./config/config"
import UsersDAO from "./dao/usersDAO"

const port: number = Number(process.env.PORT) || 8000
const URI = environment === "production" ? DB_URI : LOCAL_DB_URI

MongoClient.connect(URI, MONGO_OPTIONS)
  .then(async (client: MongoClient) => {
    await StudentDAO.injectDB(client)
    await UsersDAO.injectDB(client)

    server.listen(port)
  })
  .catch((err: MongoNotConnectedError) => {
    throw new Error(err.message)
  })
