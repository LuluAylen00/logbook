const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const controller = require('../controllers/main-controller');

router.get("/", controller.home);

router.get("/api/log", controller.showRegistry);

router.post("/api/log", controller.newRegister);

router.post("/api/adi-upload", upload.single("adi"), controller.uploadAdi);
router.get("/api/adi-export/reset/:file", controller.exportAdiClean);
router.get("/api/adi-export/:file", controller.exportAdi);

module.exports = router;