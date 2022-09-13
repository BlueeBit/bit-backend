import server from "./server"
import { DB_URI, MONGO_OPTIONS } from "./constants/database"
import { MongoClient, MongoNotConnectedError } from "mongodb"
import StudentDAO from "./dao/studentsDAO"

const port: number = Number(process.env.PORT) || 8000

MongoClient.connect(DB_URI, MONGO_OPTIONS)
  .then(async (client: MongoClient) => {
    await StudentDAO.injectDB(client)

    server.listen(port)
  })
  .catch((err: MongoNotConnectedError) => {
    throw new Error(err.message)
  })
