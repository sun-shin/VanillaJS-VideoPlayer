// requirejs('dotenv').config();

window.ajaxSuccess = function () {
  response = JSON.parse(this.responseText);
  console.log("ajaxSuccess", typeof this.responseText);
  document.getElementById('uploaded').setAttribute("src", response["secure_url"]);
  document.getElementById('results').innerText = this.responseText;
}

window.AJAXSubmit = function (formElement) {
  console.log("starting AJAXSubmit");
  if (!formElement.action) { return; }
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open("post", "https://api.cloudinary.com/v1_1/<CLOUD_NAME>/video/upload");
  xhr.send(new FormData(formElement));
}

// console.log(process.env.CLOUD_NAME);