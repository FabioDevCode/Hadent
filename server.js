import http from 'node:http';
import app from './src/app.js';

const PORT = process.env.PORT || 8008;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`✅ Boilerplate started on : ${PORT} !`);
});