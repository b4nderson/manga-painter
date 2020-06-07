import AlgorithmiaFiles from "./algorithmia-files.js"
import picturePainter from "../src/picture-painter.js"
import path from  "path"
import fs from "fs"

async function start() {
    const algorithmiaFiles = AlgorithmiaFiles("Andersonbarbosa", "mp_directory")
    const allFiles = createDirectoryAndUploadFiles()

    //await paintAllImages(allFiles)
    downloadAllColorsImages(allFiles)

    function createDirectoryAndUploadFiles() {
        const allFiles = fs.readdirSync(path.join(path.resolve(), "/manga/black-and-white"))
        return allFiles
        algorithmiaFiles.createDirectory()

        allFiles.forEach((file) => {
            algorithmiaFiles.upload(file)
        })
        console.log("Finish!")
        return allFiles
    }

    async function paintAllImages(allFiles) {
        const clientData = {
            username: "Andersonbarbosa",
            directoryName: "mp_directory",
            fileName: ""
        }

        allFiles.forEach(async (file) => {
            clientData.fileName = file
            await picturePainter(clientData)
        })
    }

    function downloadAllColorsImages(allFiles) {
        allFiles.forEach((file) => {
            algorithmiaFiles.download(file)
        })
    }
}

start()