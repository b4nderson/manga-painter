import algorithmia from "algorithmia"

export default async function PicturePainter(clientData) {
    console.log(clientData)
    const input = {
        "image": `data://${clientData.username}/${clientData.directoryName}/${clientData.fileName}`
    }

    await coloringImages()

    async function coloringImages() {
        const algorithmiaAuthenticated = algorithmia.client("sim9kvqk8gCKjAVygvqXU8X6YPu1")
        const colorizationAlgorithm = algorithmiaAuthenticated.algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300")
        const colorizationResponde = await colorizationAlgorithm.pipe(input)
        const colorizationContent = colorizationResponde.get()
    
        console.log(colorizationContent)
    }
}