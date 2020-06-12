import mangaPainter from "./src/manga-painter.js"
import createPDFs from "./src/algorithms/create-pdf.js"
import readline from "readline-sync"
import path from "path"

 async function start() {
    const nameFileFolderPathAndFileFolder = askAnReturnPathFiles()

    await mangaPainter(nameFileFolderPathAndFileFolder)
    createPDFs(nameFileFolderPathAndFileFolder)

    function askAnReturnPathFiles() {
        const fileFolder= readline.question("What folder are the files? ")
        const fileFolderPath = path.join(path.resolve(), `/manga/black-and-white/${fileFolder}/`)
        const fileFolderName = fileFolder.replace(/_/g, "-").replace(/\//g, "-")

        return {fileFolderPath, fileFolderName}
    }

}

start()