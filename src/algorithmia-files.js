import algorithmia from "algorithmia"
import path from "path"
import fs from "fs"

export default function algorithmiaFiles(username, directoryName) {
    const algorithmiaAuthenticated = algorithmia.client("sim9kvqk8gCKjAVygvqXU8X6YPu1")
    const mp_directory = algorithmiaAuthenticated.dir(`data://${username}/${directoryName}`)

    function createDirectory() {
        mp_directory.exists((exists) => {
            if (!exists) {
                mp_directory.create((response) => {
                    if (response.error) {
                        return console.log(`Failed to create dir : ${response.error.message}`)
                    } else {
                        console.log(`Created directory: ${mp_directory.data_path}`)
                    }
                })
            } else {
                console.log("Your directory already exists.")
            }
        })
    }

    function upload(fileName) {
        const FilePath = path.join(path.resolve(), `/manga/black-and-white/${fileName}`)
        const fileUploaded = `data://${username}/${directoryName}/${fileName}`

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (!exists) {
                mp_directory.putFile(FilePath, (response) => {
                    if (response.error) {
                        return console.log(`Failed to upload file: ${response.error.message}`)
                    } else {
                        console.log(`File uploaded.`)
                    }
                })
            } else {
                console.log("Your file already exists.")
            }
        })
    }
    
    function download(fileName) {
        const newFileName = fileName.replace(".jpg", ".png")
        const fileUploaded = `data://.algo/deeplearning/ColorfulImageColorization/temp/${newFileName}`

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (exists) {
                algorithmiaAuthenticated.file(fileUploaded).get((error, data) => {
                    if (error) {
                        return console.log(`Failed to download file. \n Error: ${error}`)
                    }    

                    fs.writeFileSync(path.join(path.resolve(), `/manga/colorful/${fileName}`), data)      
                    console.log("successfully dowanloaded data.")
                })
            } else {
                console.log("File does not exist.")
            }
        })
    }

    return {
        createDirectory,
        upload,
        download
    }
}