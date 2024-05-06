const path = require('path');
const fs = require('fs');

const registry = require('../services/main-service');
const files = require('../services/file-service');

const controller = {
    home: (req,res) => {
        return res.sendFile(path.resolve(__dirname, "../views/index.html"))
    },
    showRegistry: (req, res) => {
        let results = registry.findAll();

        return res.send(results);
    },
    newRegister: (req, res) => {
        console.log(req.body);
        let newReg = registry.create(req.body);
        if (newReg) {
            return res.send({status: 204});
        } else {
            return res.send({status: 503});
        }
    },
    cleanRegistry: (req, res) => {
        let cleaner = registry.write([]);
        if (cleaner) {
            return res.send({status: 204});
        } else {
            return res.send({status: 503});
        }
    },
    eraseRegistry: (req, res) => {
        let cleaner = registry.deleteById(req.params.id);
        if (cleaner) {
            return res.send({status: 204});
        } else {
            return res.send({status: 503});
        }
    },
    uploadAdi: (req, res) => {
        let importedData = String(req.file.buffer);
        // console.log(files.adi.parseToJson(importedData));
        let uploaded = registry.import(files.adi.parseToJson(importedData));
        res.redirect('/');
    },
    exportAdi: (req, res) => {
        let data = registry.export();
        const filePath = path.join(__dirname,'../data/data.adi');
        const fileName = path.basename(filePath);
        res.sendFile(filePath, { fileName });
        // res.redirect('/');
    },
    exportAdiClean: (req, res) => {
        let data = registry.exportClean();
        const filePath = path.join(__dirname,'../data/data.adi');
        const fileName = path.basename(filePath);
        res.sendFile(filePath, { fileName });
        // res.redirect('/');
    },
};

module.exports = controller;