const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const https = require('https');

const downloadUrl = "https://dn720904.ca.archive.org/0/items/ps3-games/ASURA%27S%20WRATH%20%5BBLUS30721%5D.iso"; // URL do arquivo

// Rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para iniciar o download
app.get('/download', (req, res) => {
    https.get(downloadUrl, (fileRes) => {
        res.setHeader('Content-Type', 'application/x-iso9660-image');
        res.setHeader('Content-Disposition', 'attachment; filename="ASURAS_WRATH.iso"');
        fileRes.pipe(res);
    }).on('error', (err) => {
        res.status(500).send('Erro no download');
    });
});

// Inicializando o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
