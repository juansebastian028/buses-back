const path = require('path');
const { response } = require('express');
const { uploadFile } = require('../helpers');

const cargarArchivo = async(req, res = response) => {
    try {
        const nombre = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const showImage = async(req, res = response ) => {
    const { file } = req.params;
    const pathImage = path.join( __dirname, '../uploads', '/imgs/', file );
    res.sendFile( pathImage );
}

module.exports = {
    cargarArchivo,
    showImage
}