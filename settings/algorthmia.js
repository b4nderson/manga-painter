import dotenv from "dotenv"

dotenv.config()

const apiKey = process.env.algorithmiaApiKey
const username = process.env.algorithmiaUsername
const directoryName = "mp_directory"

export {apiKey, username, directoryName}
