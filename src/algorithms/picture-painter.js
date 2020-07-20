import algorithmia from "algorithmia"
import { apiKey, username, directoryName } from "../../settings/algorthmia"

export default async function PicturePainter(fileName, resolvedPromise, callback) {
    const input = {
        "image": `data://${username}/${directoryName}/${fileName}`
    }

    try {
        await coloringImages()
    } catch(error) {
        console.log(`Erro: ${error}`)
    }

    async function coloringImages() {
        const algorithmiaAuthenticated = algorithmia.client(apiKey)
        const colorizationAlgorithm = algorithmiaAuthenticated.algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300")
        const colorizationResponde = await colorizationAlgorithm.pipe(input)
        const colorizationContent = colorizationResponde.get()
        
        console.log(colorizationContent)
        
        resolvedPromise.initCounter++
        callback()
    }
}