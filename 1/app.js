const http = require('http');

const server = http.createServer(
    (req, res) => {
        if (req.url === '/') {
            res.end('<h1>Hello World</h1>')
        }
    }
);

server.listen(3000, () => console.log('server running on port 3000'))