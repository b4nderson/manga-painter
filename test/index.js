import Algorithmia from "algorithmia"

var input = {
  "src":{"bucket":"Algorithm Data", "key":"20.png"},
  "creds":"data://s3utilities/test/credentials", 
  "dest":"data://.algo/deeplearning/ColorfulImageColorization/temp/"
};
Algorithmia.client("sim9kvqk8gCKjAVygvqXU8X6YPu1")
  .algo("s3utilities/DownloadFilefromS3/0.1.0?timeout=300") // timeout is optional
  .pipe(input)
  .then(function(response) {
    console.log(response.get());
  });