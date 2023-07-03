import { IncomingMessage, ServerResponse} from 'node:http';

export default function handlerServer(req: IncomingMessage, res: ServerResponse): void {
	console.log(req);
	res.write('GOVNO');
	res.end();
};