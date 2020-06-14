import algorithmia from "algorithmia"
import path, { resolve } from "path"
import fs, { promises } from "fs"
import {apiKey, username, directoryName} from "../../settings/algorthmia.js"

export default function algorithmiaFiles(fileFolderPath, fileFolderName) {
    const algorithmiaAuthenticated = algorithmia.client(apiKey)
    const mp_directory = algorithmiaAuthenticated.dir(`data://${username}/${directoryName}`)

    function createDirectory() {
        return new Promise((resolve, reject) => {
            mp_directory.exists((exists) => {
                if (!exists) {
                    mp_directory.create((response) => {
                        if (response.error) {
                            reject(`Failed to create dir : ${response.error.message}`)
                        } else {
                            resolve(`Created directory: ${mp_directory.data_path}`)
                        }
                    })
                } else {
                    reject(`Your directory ${directoryName} already exists.`)
                }
            })
        })
    }

    function upload(fileName, resolvedPromise, callback) {
        const FilePath = `${fileFolderPath}/${fileName}`
        const fileUploaded = `data://${username}/${directoryName}/${fileName}`

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (!exists) {
                mp_directory.putFile(FilePath, (response) => {
                    resolvedPromise.initCounter++
                    
                    if (!response.error) {
                        console.log(`File ${fileName} uploaded.`)
                        callback()
                    } else {
                        console.log(`Error: ${response.error.message}`)
                        callback()
                    }
                })
            } else {
                resolvedPromise.initCounter++
                console.log(`Info: file ${fileName} already exists.`)
                callback()
            }
        })
    }
    
    function download(fileName, resolvedPromise, callback) {
        const newFileName = fileName.replace(".jpg", ".png")
        const fileUploaded = `data://.algo/deeplearning/ColorfulImageColorization/temp/${newFileName}`
        const downloadFolder = path.join(path.resolve(), `/manga/images/colorful/${fileFolderName}`)

        algorithmiaAuthenticated.file(fileUploaded).exists((exists) => {
            if (exists) {
                algorithmiaAuthenticated.file(fileUploaded).get((error, data) => {
                    resolvedPromise.initCounter++

                    if (!fs.existsSync(downloadFolder)) {
                        fs.mkdirSync(downloadFolder)
                    }

                    fs.writeFileSync(path.join(downloadFolder, `/${newFileName}`), data)    
                    console.log(`successfully dowanloaded file ${fileName}.`)
                    
                    callback()
                })
            } else {
                console.log(`File ${fileName} does not exist.`)
                resolvedPromise.initCounter++
                callback()
            }
        })
    }

    function deleteDirectory() {
        return new Promise((resolve, reject) => {
            mp_directory.delete(true, (response) => {
                if (response.error) {
                    reject(`Failed to delete directory: ${response.error.message}`)
                } else {
                    resolve("Directory deleted!")
                }
            })
        })
    }

    return {
        createDirectory,
        upload,
        download,
        deleteDirectory
    }
}