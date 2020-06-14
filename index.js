import mangaPainter from "./src/manga-painter.js"
import createPDFs from "./src/algorithms/create-pdf.js"
import readline from "readline-sync"
import chromeOpn from "chrome-opn"
import path from "path"
import { designStartMangaPainter, designOpenGooglechrome } from "./src/design/design.js"

async function start() {
    const nameFileFolderPathAndFileFolder = askAnReturnPathFiles()
    await mangaPainter(nameFileFolderPathAndFileFolder)

    const colorfulPDFPath = createPDFs(nameFileFolderPathAndFileFolder)
    openFile(colorfulPDFPath)

    function askAnReturnPathFiles() {
        designStartMangaPainter()

        const fileFolder= readline.question("What folder are the files? ")
        const fileFolderPath = path.join(path.resolve(), `/manga/images/black-and-white/${fileFolder}/`)
        const fileFolderName = fileFolder.replace(/_/g, "-").replace(/\//g, "-")

        return {fileFolderPath, fileFolderName}
    }

    function openFile(colorfulPDFPath) {
        designOpenGooglechrome()
        setTimeout(() => {
            chromeOpn(colorfulPDFPath)
        }, 5000)
    }

}

start()