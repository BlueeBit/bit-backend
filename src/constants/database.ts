import { MongoClientOptions } from "mongodb"

export const DB_URI: string = process.env.DB_URI || ""
export const LOCAL_DB_URI: string = process.env.LOCAL_DB_URI || ""

export const MONGO_OPTIONS: MongoClientOptions = {
  retryWrites: true,
  writeConcern: {
    wtimeout: 2500,
    w: "majority",
  },
}
