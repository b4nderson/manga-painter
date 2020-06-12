import PDFDocument from "pdfkit"
import path from "path"
import fs from "fs"

export default function createPDFs({ fileFolderPath, fileFolderName }) {
    const allFiles = fs.readdirSync(fileFolderPath)
    
    createBlackAndWhitePDF()
    createColorfulPDF()

    function createBlackAndWhitePDF() {
        const fileName = fileFolderName.replace(/\//g, "_") 
        const doc = new PDFDocument()

        doc.pipe(fs.createWriteStream(path.join(path.resolve(), `/manga/pdfs/black-and-white/${fileName}.pdf`)))  
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

        console.log("Black and White PDF created!")
    }

    function createColorfulPDF() {
        const fileName = fileFolderName.replace(/\//g, "-")
        const doc = new PDFDocument()

        doc.pipe(fs.createWriteStream(path.join(path.resolve(), `/manga/pdfs/colorful/${fileName}.pdf`)))
        draw(doc).init()

        allFiles.forEach((file) => {
            const newFileName = file.replace(".jpg", ".png")
            doc.addPage()

            if (allFiles.indexOf(file) === 0) {
                doc.image(`${fileFolderPath}/${file}`, {
                    fit: [470, 900],
                    align: 'justify-all',
                    valign: 'super'
                })  
            } else {
                doc.image(path.join(path.join(path.resolve(), `/manga/colorful/${fileFolderName}/${newFileName}`)), {
                    fit: [470, 900],
                    align: 'justify-all',
                    valign: 'super'
                })
            }
        })

        doc.addPage()
        draw(doc).end()
        doc.end()

        console.log("ColorfulPDF created!")
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