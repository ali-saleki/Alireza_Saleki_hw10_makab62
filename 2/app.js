const http = require('http');

const fs = require('fs');

const path = require('path');


const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        'public',
        req.url === '/contact' ? 'contact.json' : req.url
    )
    let extname = path.extname(filePath)

    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;

    }

    if (contentType === 'text/html' && extname === '') {
        filePath += '.html'
    }

    fs.readFile(filePath,
        (err, data) => {
            if (err) {
                // console.log(err);
                if (err.code === 'ENOENT') {
                    fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                        res.writeHead(404, { 'Content-Type': contentType })
                        res.end(data)
                    })
                } else {
                    res.writeHead(500);
                    res.end(`Server error: ${err.code}`)
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(data);
            }
        })
});

server.listen(3000, () => console.log('server is running on port: 3000'))