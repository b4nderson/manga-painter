import PDFDocument from "pdfkit"
import path from "path"
import fs from "fs"
import { designCreatePDF } from "../design/design"

export default function createPDFs({ fileFolderPath, fileFolderName }) {
    const allFiles = fs.readdirSync(fileFolderPath).sort()
    const fileName = fileFolderName.replace(/\//g, "_") 
    
    const blackAndWhitePDFPath = path.join(path.resolve(), `/manga/pdfs/black-and-white/${fileName}.pdf`)
    const colorfulPDFPath = path.join(path.resolve(), `/manga/pdfs/colorful/${fileName}.pdf`)

    designCreatePDF()
    createBlackAndWhitePDF()
    createColorfulPDF()

    return colorfulPDFPath

    function createBlackAndWhitePDF() {
        const doc = new PDFDocument()

        doc.pipe(fs.createWriteStream(blackAndWhitePDFPath))  
        draw(doc).init()

        allFiles.forEach((file) => {
            doc.addPage()

            doc.image(`${fileFolderPath}/${file}`), {
                fit: [470, 900],
                align: 'justify-all',
                valign: 'super'
            }
        })

        doc.addPage()
        draw(doc).end()
        doc.end()

        console.log("------------------------------------------")
        console.log("Black and White PDF: created with success.")
    }

    function createColorfulPDF() {
        const doc = new PDFDocument()

        doc.pipe(fs.createWriteStream(colorfulPDFPath))
        draw(doc).init()

        allFiles.forEach((file) => {
            const kindOfImages = file.slice(-4)
            const newFileName = kindOfImages.includes(".") ? file.replace(kindOfImages, ".png") : file.replace(`.${kindOfImages}`, ".png")

            doc.addPage()

            if (allFiles.indexOf(file) === 0) {
                doc.image(`${fileFolderPath}/${file}`, {
                    fit: [470, 900],
                    align: 'justify-all',
                    valign: 'super'
                })  
            } else {
                doc.image(path.join(path.join(path.resolve(), `/manga/images/colorful/${fileFolderName}/${newFileName}`)), {
                    fit: [470, 900],
                    align: 'justify-all',
                    valign: 'super'
                })
            }
        })

        doc.addPage()
        draw(doc).end()
        doc.end()

        console.log("Colorful PDF: created with success!")
        console.log("------------------------------------------")
    }
 
    function draw(doc) {
        function init() {
            doc.fillColor('red')
                .fontSize(30)
                .text('Painted by manga-painter', 150, 350)
    
            doc.fillColor('blue')
                .fontSize(20)
                .text('Código fonte: AQUI', 215, 450)
                .underline(210, 445, 180, 27, { color: '#0000FF' })
                .link(210, 445, 180, 27, 'https://github.com/Anderson-TI-Lim/manga-painter')

            doc.fillColor('green')
                .fontSize(12)
                .text('https://github.com/Anderson-TI-Lim/manga-painter', 165, 480)
        }

        function end() {
            doc.fillColor('red')
                .fontSize(50)
                .text('Obrigado!', 200, 350)
        }

        return {
            init,
            end
        }
    }
}