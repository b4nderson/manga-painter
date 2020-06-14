import AlgorithmiaFiles from "./algorithms/algorithmia-files.js"
import picturePainter from "./algorithms/picture-painter.js"
import fs, { promises } from "fs"
import { designCreateDirectory, designUploadFiles, designPaintingFiles,
    designDownloadFiles, designDeleteDirectory} from "./design/design.js"

export default async function mangaPainter({ fileFolderPath, fileFolderName }) {
    const algorithmiaFiles = AlgorithmiaFiles(fileFolderPath, fileFolderName)
    const allFiles = readFiles()

    try {
        await createDirectory()
    } catch(error) {
        console.log(`Info: ${error}`)
    }

    await uploadFiles(allFiles)
    await paintAllImages(allFiles)
    await downloadAllColorfulImages(allFiles)

    try {
        await deleteDirectory()
    } catch(info) {
        console.log(`Info: ${info}`)
    }
    
    function readFiles() {
        if (fs.existsSync(fileFolderPath)) {
            const allFiles = fs.readdirSync(fileFolderPath)
            return allFiles
        } 

        console.log(`The path ${fileFolderPath} is not exists.`)
        process.exit()
    }

    function returnResolvedPromiseObject() {
        const resolvedPromise = {
            initCounter: 0,
            endCounter: allFiles.length
        }

        resolvedPromise.initCounter = 0
        return resolvedPromise
    }

    async function createDirectory() {
        designCreateDirectory()
        const createDirectoryStatus = await algorithmiaFiles.createDirectory()
        console.log(createDirectoryStatus)
    }

    async function uploadFiles(allFiles) {
        designUploadFiles()
        const resolvedPromise = returnResolvedPromiseObject()

        return new Promise((resolve) => {
            allFiles.forEach(async (file) => {
                algorithmiaFiles.upload(file, resolvedPromise, () => {
                    if (resolvedPromise.initCounter === resolvedPromise.endCounter) {
                        resolve()
                    }
                })
            })
        })
    }

    async function paintAllImages(allFiles) {
        designPaintingFiles()
        const resolvedPromise = returnResolvedPromiseObject()

        return new Promise((resolve) => {
            allFiles.forEach(async (file) => {
                await picturePainter(file, resolvedPromise, () => {
                    if (resolvedPromise.initCounter === resolvedPromise.endCounter) {
                        resolve()
                    }
                })
            })
        })
    }

    async function downloadAllColorfulImages(allFiles) {
        designDownloadFiles()
        const resolvedPromise = returnResolvedPromiseObject()
        
        return new Promise((resolve) => {
            allFiles.forEach(async (file) => {
                algorithmiaFiles.download(file, resolvedPromise, () => {
                    if (resolvedPromise.initCounter === resolvedPromise.endCounter) {
                        resolve()
                    }
                })
            })
        })
    }

    async function deleteDirectory() {
        designDeleteDirectory()
        const deleteDirectoryStatus = await algorithmiaFiles.deleteDirectory()
        console.log(deleteDirectoryStatus)
    }
}