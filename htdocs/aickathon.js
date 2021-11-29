const API_URL = 'file:///C:/xampp/htdocs/new%201.html'
const ACCESS_KEY = '9dcb8e1ca4ac3a01d96c'
const SECRET_KEY = '434c2c8be8dd7ef8234797fad070cb7893c94df9'
//Please edit the parameters above to suit your needs

function uploadPhoto() {
  let formData = new FormData(document.forms.namedItem('fileinfo'))
  // if you are using node.js to upload local file
  // var formData = new FormData()
  // formData.append('filename', fs.createReadStream(__dirname + '/my_photo.jpg'))
  
  formData.append('access_key', ACCESS_KEY)
  formData.append('secret_key', SECRET_KEY)

  // Method 1: pure javascript
  let xhr = new XMLHttpRequest()
  xhr.open('POST', API_URL)
  xhr.onload = () =>
    xhr.status === 200
      ? doSomethingWith(JSON.parse(xhr.response))
      : console.log(xhr.status)
  xhr.send(formData)

  // Method 2: fetch API
  fetch(API_URL, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(json => doSomethingWith(json))

  // Method 3: axios library
  axios.post(API_URL, formData).then(response => doSomethingWith(response.data))
  
  // Method 4: FormData submit (for node.js only)
  formData.submit(API_URL, (err, res) =>
    res.on('data', data => doSomethingWith(JSON.parse(data.toString())))
  )
  
  // Method 5: request library (for node.js only)
  let formdata = {
    filename: fs.createReadStream(__dirname + '/test.jpg'),
    access_key: ACCESS_KEY,
    secret_key: SECRET_KEY
  }

  request.post({ url: API_URL, formData: formdata }, (err, res, body) => {
    doSomethingWith(JSON.parse(res.body))
  })
}

function doSomethingWith(data) {
  // do something with your data here
  console.log(data)
}