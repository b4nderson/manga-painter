import PDFDocument from "pdfkit"
import path from "path"
import fs from "fs"

const doc = new PDFDocument()

doc.pipe(fs.createWriteStream(path.join(path.resolve(), `/oi.pdf`)))  
        

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

doc.end()