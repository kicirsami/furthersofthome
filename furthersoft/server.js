const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const router = express.Router();
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator');

app.use(bodyParser.json());
app.use(express.json()) // parsing application
app.use(express.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://FurthersoftHome:furthersofthome12345@cluster0.gt9zr.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection
database.on('error', (error) => console.error(error))
database.once('open', () => console.log('connected to database')) //once connected



const İletişim = new mongoose.Schema({
    İsim: {
        type: String,
    },
    Soyisim: {
        type: String,
    },
    Email: {
        type: String,
    },
    TelefonNumarası: {
        type: Number,
    },
    İlçeSeçimi: {
        type: String,
    },
    Adres: {
        type: String,
    },
    Tanım: {
        type: String
    },
})
const model = mongoose.model('İletişim', İletişim, 'İletişim');

router.post('/', body('Email').isEmail(), body('TelefonNumarası').isNumeric(), async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // console.log("Body", req.body);
        const Müşteri = await model.create({
            _id: mongoose.Types.ObjectId(),
            İsim: req.body.İsim,
            Soyisim: req.body.Soyisim,
            Email: req.body.Email,
            TelefonNumarası: req.body.TelefonNumarası,
            İlçeSeçimi: req.body.İlçeSeçimi,
            Adres: req.body.Adres,
            Tanım: req.body.Tanım,
        })
        Müşteri.save().then((veri) => res.status(201).send({ veri }));

    } catch (err) {
        return res.status(401).json({ message: err.message })

    }
})
var cors = require('cors');
app.use(cors());
app.use('/form', router)

app.listen(port, () => {
    console.log("Server is Running " + 'at ' + 'port ' + port)
});