import algorithmia from "algorithmia"
import { apiKey } from "../../settings/algorthmia.js"

export default async function PicturePainter(clientData) {
    const input = {
        "image": `data://${clientData.username}/${clientData.directoryName}/${clientData.fileName}`
    }

    await coloringImages()

    async function coloringImages() {
        const algorithmiaAuthenticated = algorithmia.client(apiKey)
        const colorizationAlgorithm = algorithmiaAuthenticated.algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300")
        const colorizationResponde = await colorizationAlgorithm.pipe(input)
        const colorizationContent = colorizationResponde.get()
    
        console.log(colorizationContent)
    }
}