const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const app = express();
const schema = mongoose.Schema;
const upload = multer({ storage: storage })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'file/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use('/file', express.static('file'));

app.listen(3000, function () {
    console.log('Server Running At 3000 Port!')
})

app.get('/', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})
app.post('/', upload.single('file'), function(req,res){
    console.log(req.file);
    res.send('Success')
});
