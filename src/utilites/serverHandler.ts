import http from 'node:http';
import { IncomingMessage, ServerResponse } from 'node:http';

export default function raiseServer(port: number | string,
	handlerServer: (req: IncomingMessage, res: ServerResponse) => void):
	http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> {
	
	const server = http.createServer(handlerServer);

	server.listen(port, () => console.log(`Server started on localhost:${port}`));

	return server;
}

