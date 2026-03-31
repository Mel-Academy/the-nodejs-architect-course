const fs = require('fs');
const { error } = require('console');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // SOLUTION 1: The Memory-Hungry way 
    fs.readFile('test-file.txt', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            res.statusCode = 500;
            res.end('Server Error');
            return
        }
        res.end(data);
    });
});

// Handle server errors (like port alredy in use);
server.on('error', err => {
    if (err.code === "EADDRINUSE") {
        console.log('ERROR: Port 8000 is already in use!');
    };
});

server.listen(8000, () => {
    console.log('✅ Success: Server is listening on port 8000...');
});

server.on('request', (req, res) => {
    const readable = fs.createReadStream('test-file.txt');

    readable.on('data', chunk => {
        res.write(chunk);
    });

    readable.on('end', () => {
        res.end();
    });
    readable.on('error', err => {
        console.log('Stream Error:', err);
        res.statusCode = 500;
        res.end('File not found')
    });

    // SOURCE.pipe(Destination)
    readable.pipe(res);
});