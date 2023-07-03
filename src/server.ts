import http from 'node:http';

import handlerServer from './utils/handlerServer';

const port = process.env.PORT;

const server = http.createServer(handlerServer);

server.listen(port, () => console.log(`Server started on localhost:${port}`));