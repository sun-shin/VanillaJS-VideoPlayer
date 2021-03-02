const myVideo = document.getElementById("myVideo");
var myWidget = cloudinary.createUploadWidget({
  cloudName: 'sdfajjjadfsk',
  uploadPreset: 'vf_upload'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    console.log('Done! Here is the image info: ', result.info);
    myVideo.src = result.info.url;
  }
}
);

document.getElementById("upload_widget").addEventListener("click", function () {
  myWidget.open();
}, false);