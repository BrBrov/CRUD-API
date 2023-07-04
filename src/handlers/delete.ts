import { IncomingMessage, ServerResponse } from 'node:http';
import { database, DataBase } from '../db/db';
import User from '../models/user';
import StatusCodes from '../models/status-codes';

export default class DeleteHandler {
	private database: DataBase;
	constructor(req: IncomingMessage, res: ServerResponse) {
		this.database = database;
		this.handler(req, res);
	}

	private handler(req: IncomingMessage, res: ServerResponse): void {
		const urlArr = req.url.split('/').slice(1);
		if (urlArr.length < 3) this.sendErr(res);

		const id = urlArr[2];
		const api = urlArr.slice(0, -1).join('/');

		if (api !== 'api/users') this.sendErr(res);
		if (!id || !Number(id)) {
			this.sendErr(res);
		} else {
			const user: User | null = this.database.deleteUser(id);

			if (!user) {
				res.statusCode = StatusCodes.Undefined;
				res.write(JSON.stringify(
					{
						status: StatusCodes.Undefined,
						data: 'User was not found'
					}));
				res.end();
			} else {
				res.statusCode = StatusCodes.Delete;
				res.end();
			}
		}
	}

	private sendErr(res: ServerResponse): void {
		res.statusCode = StatusCodes.Invalid;
		res.write(JSON.stringify(
			{
				status: StatusCodes.Invalid,
				data: 'Wrong API request'
			}));
		res.end();
	}
}