import AlgorithmiaFiles from "./algorithms/algorithmia-files.js"
import picturePainter from "./algorithms/picture-painter.js"
import path from  "path"
import fs from "fs"

export default async function mangaPainter() {
    const algorithmiaFiles = AlgorithmiaFiles("Andersonbarbosa", "mp_directory")
    const allFiles = createDirectoryAndUploadFiles()

    await paintAllImages(allFiles)
    downloadAllColorsImagesSAndDeleteDirectory(allFiles)

    function createDirectoryAndUploadFiles() {
        const allFiles = fs.readdirSync(path.join(path.resolve(), "/manga/black-and-white"))
        algorithmiaFiles.createDirectory()

        allFiles.forEach((file) => {
            algorithmiaFiles.upload(file)
        })

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

    function downloadAllColorsImagesSAndDeleteDirectory(allFiles) {
        allFiles.forEach((file) => {
            algorithmiaFiles.download(file)
        })

        deleteDirectory()
    }

    function deleteDirectory() {
        algorithmiaFiles.deleteDirectory()
    }
}