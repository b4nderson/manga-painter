import AlgorithmiaFiles from "./algorithms/algorithmia-files"
import picturePainter from "./algorithms/picture-painter"
import fs from "fs"
import { designCreateDirectory, designUploadFiles, designPaintingFiles,
    designDownloadFiles, designDeleteDirectory} from "./design/design"

export default async function mangaPainter({ fileFolderPath, fileFolderName }) {
    const algorithmiaFiles = AlgorithmiaFiles(fileFolderPath, fileFolderName)
    const allFiles = readAndVerifyFiles()

    try {
       await createDirectory()
    } catch(info) {
        console.log(`Info: ${info}`)
    }

    await uploadFiles(allFiles)
    await paintAllImages(allFiles)
    await downloadAllColorfulImages(allFiles)

    try {
        await deleteDirectory()
    } catch(info) {
        console.log(`Info: ${info}`)
    }
    
    function readAndVerifyFiles() {
        if (fs.existsSync(fileFolderPath)) {
            const allFiles = fs.readdirSync(fileFolderPath)
            const kindOfImages = ["png", ".png", "jpeg", "jpg", ".jpg"]

            allFiles.filter((file) => {
                const kindThisImage = file.slice(-4)

                if (!kindOfImages.includes(kindThisImage) && !kindOfImages.includes(`.${kindThisImage}`)) {
                    console.log(`The file ${file} has a type undefineds.`)
                    return process.exit()
                } 
            })
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

    function returnNewPromise(functionNameAlgorithmiaFiles) {
        const resolvedPromise = returnResolvedPromiseObject()
        return new Promise((resolve) => {
            allFiles.forEach(async (file) => {
                functionNameAlgorithmiaFiles(file, resolvedPromise, () => {
                    if (resolvedPromise.initCounter === resolvedPromise.endCounter) {
                        resolve()
                    }
                })
            })
        })
    }

    async function createDirectory() {
        designCreateDirectory()
        const createDirectoryStatus = await algorithmiaFiles.createDirectory()
        console.log(createDirectoryStatus)
    }

    async function uploadFiles() {
        designUploadFiles()
        return returnNewPromise(algorithmiaFiles.upload)
    }

    async function paintAllImages() {
        designPaintingFiles()
        return returnNewPromise(picturePainter)
    }

    async function downloadAllColorfulImages() {
        designDownloadFiles()
        return returnNewPromise(algorithmiaFiles.download)
    }

    async function deleteDirectory() {
        designDeleteDirectory()
        const deleteDirectoryStatus = await algorithmiaFiles.deleteDirectory()
        console.log(deleteDirectoryStatus)
    }
}