const multer = require("multer");
const path = require("path");

const routes = require("../routes/routes");
const Item = require("../models/item.model");

const { extensions } = require("../constants/shared");

const allowedExtensions = [extensions.PNG, extensions.JPEG];
// Config

// Paso objeto js con funciones
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, routes.public.images.icons);
    },
    filename: function(req, file, cb) {
        const suffix = "itemicon";
        const originalName = file.originalname.replace(/\s+/g, '_');
        cb(null, `${path.parse(originalName).name}-${suffix}${path.extname(originalName)}`);
    }
});

const fileFilter = function(req, file, cb){
    const extension = path.extname(file.originalname).toLowerCase();
    console.log("EXTENSION: + " + extension);
    if(!allowedExtensions.includes(extension)){
        console.log("Error uploading file: extension not allowed");
        cb(null, false);
    } else {
        cb(null, true);
    }
}

const limits = {
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}

const upload = multer({ storage, limits, fileFilter})
module.exports = upload;
