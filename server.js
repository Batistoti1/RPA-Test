const express = require('express');
const cors = require('cors');
const nedb = require('nedb');
const bodyParser = require('body-parser');
const db = new nedb({ filename: './database.db', autoload: true });

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/ipinfo', (req, res) => {

    db.find({}, (err, ipinfo) => {

        res.json(ipinfo);


    });
});

app.post('/ipinfo', (req, res) => {

    db.insert({
        ip: req.body.ip,
        city: req.body.city,
        region: req.body.region


    }, (err, doc) => {

        res.json(doc)

    });


});

app.delete('/ipinfo/:id', (req, res) => {

    db.remove({
        _id: req.params.id


    }, (err) => {

        res.json({
            success: true
        });

    });


});

app.listen(3000, () => {

    console.log('Servidor funcionando');


});