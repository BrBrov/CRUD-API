import PostHandler from '../handlers/post';
import GetHandler from '../handlers/get';
import PutHandler from '../handlers/put';
import DeleteHandler from '../handlers/delete';

import StatusCodes from '../models/status-codes';
import { IncomingMessage, ServerResponse } from 'node:http';

export default function handlerServer(req: IncomingMessage, res: ServerResponse): void {

	switch (req.method) {
		case 'GET':
			new GetHandler(req, res);
			break;
		case 'POST':
			new PostHandler(req, res);
			break;
		case 'PUT':
			new PutHandler(req, res);
			break;
		case 'DELETE':
			new DeleteHandler(req, res);
			break;
		default:
			res.statusCode = StatusCodes.Undefined;
			res.write(JSON.stringify(
				{
					status: StatusCodes.Undefined,
					data: 'Wrong API request'			
				}));
			res.end();
			break;
	}
};