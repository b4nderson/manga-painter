import AlgorithmiaFiles from "./algorithms/algorithmia-files.js"
import picturePainter from "./algorithms/picture-painter.js"
import { username, directoryName } from "../settings/algorthmia.js"
import fs from "fs"

export default async function mangaPainter({ fileFolderPath, fileFolderName }) {
    console.log(username, directoryName)
    const algorithmiaFiles = AlgorithmiaFiles(username, directoryName, fileFolderPath, fileFolderName)
    const allFiles = readFiles()

    createDirectory()

    uploadFilesAndPainterImages(allFiles, async () => {
        try {
            await paintAllImages(allFiles)
        } catch(error) {
            console.log(error)
        }
        
        downloadAllColorsImagesSAndDeleteDirectory(allFiles, () => {
            deleteDirectory()
        })
    })

    function readFiles() {
        const allFiles = fs.readdirSync(fileFolderPath)
        return allFiles
    }

    function createDirectory() {
        algorithmiaFiles.createDirectory()
    }

    function uploadFilesAndPainterImages(allFiles, callback) {
        allFiles.forEach((file) => {
            algorithmiaFiles.upload(file)
            if (allFiles.indexOf(file) === allFiles.length - 1) {
                callback()
            }
        })
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

    function downloadAllColorsImagesSAndDeleteDirectory(allFiles, callback) {
        allFiles.forEach((file) => {
            algorithmiaFiles.download(file)
            if (allFiles.indexOf(file) === allFiles.length - 1) {
                callback()
            }
        })
    }

    function deleteDirectory() {
        algorithmiaFiles.deleteDirectory()
    }
}