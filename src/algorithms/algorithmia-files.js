import algorithmia from "algorithmia"
import path from "path"
import fs from "fs"

export default function algorithmiaFiles(username, directoryName, fileFolderPath, fileFolderName) {
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
        const FilePath = `${fileFolderPath}/${fileName}`
        const fileUploaded = `data://${username}/${directoryName}/${fileName}`

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (!exists) {
                mp_directory.putFile(FilePath, (response) => {
                    if (!response.error) {
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
        const downloadFolder = path.join(path.resolve(), `/manga/colorful/${fileFolderName}`)

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (exists) {
                algorithmiaAuthenticated.file(fileUploaded).get((error, data) => {
                    if (!fs.existsSync(downloadFolder)) {
                        fs.mkdirSync(downloadFolder)
                    }
                    fs.writeFileSync(path.join(downloadFolder, `/${newFileName}`), data)      
                    console.log("successfully dowanloaded data.")
                })
            } else {
                console.log("File does not exist.")
            }
        })
    }

    function deleteDirectory() {
        mp_directory.delete(true, (response) => {
            if (response.error) {
                console.log(`Failed to delete directory: ${response.error.message}`)
            } else {
                console.log("Directory deleted!")
            }
        })
    }

    return {
        createDirectory,
        upload,
        download,
        deleteDirectory
    }
}