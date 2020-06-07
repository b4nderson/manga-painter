import axios from "axios"
import path from "path"
import fs from "fs"

async function start() {
    async function downloadImages() {
        const url = 'https://algorithmia.com/v1/data/.algo/deeplearning/ColorfulImageColorization/temp/05.png'
        const filePath = path.join(path.resolve(), "/manga/colorful/test.jpg")
    
        const axiosResponde = await axios({
            method: "POST",
            url: url,
            responseType: 'stream'
        })
    
        try {
            axiosResponde.data.pipe(fs.createWriteStream(filePath))
        } catch(error) {
            console.log(error)
        }
    }
    
    await downloadImages()
}

start()