const http = require('http');

const fs = require('fs');

const path = require('path');


const server = http.createServer(
    (req, res) => {
        if (req.url === '/') {

            fs.readFile(
                path.join(__dirname, 'index.html'),
                (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' })

                        res.end(data);
                    }
                }
            )

        }
    }
);

server.listen(3000, () => console.log('server is running on port: 3000'))