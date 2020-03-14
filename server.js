
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = 8585;


// Serve static files from 'public' folder in 'build'
app.use(express.static('./build/public'));

// Serve index.html file when visiting home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// When server starts, show server address and port
server.listen(PORT, () => {
    let address = server.address().address;
    let port = server.address().port;

    if (address == '::') address = 'localhost';
    
    console.log(`Server running at http://${address}:${port}`);
});