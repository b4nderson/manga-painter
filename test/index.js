import axios from "axios"
import fs from "fs"

axios({
  method: 'get',
  url: 'https://api.deepai.org/job-view-file/5d0694e6-4522-4baa-b8f1-ed27c3807af5/outputs/output.jpg',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  }).catch((err) => {
    console.log(err)
  })