import algorithmia from "algorithmia"

async function coloringPictures(directoryName, fileName) {
    const input = {
        "image": `data://Andersonbarbosa/${directoryName}/${fileName}`
    }

    const algorithmiaAuthenticated = algorithmia.client("sim9kvqk8gCKjAVygvqXU8X6YPu1")
    const colorizationAlgorithm = algorithmiaAuthenticated.algo("deeplearning/ColorfulImageColorization/1.1.14?timeout=300")
    const colorizationResponde = await colorizationAlgorithm.pipe(input)
    const colorizationContent = colorizationResponde.get()

    console.log(colorizationContent)
}