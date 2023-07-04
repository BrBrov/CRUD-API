import { IncomingMessage, ServerResponse } from 'node:http';
import { database, DataBase } from '../db/db';
import User from '../models/user';
import StatusCodes from '../models/status-codes';

export default class GetHandler {
	private database: DataBase;
	constructor(req: IncomingMessage, res: ServerResponse) {
		this.database = database;
		this.handler(req, res);
	}

	private handler(req: IncomingMessage, res: ServerResponse): void {
		const parseURL: Array<string> = req.url.split('/').slice(1);
		const api: string[] | null = parseURL.length > 1 ? parseURL.slice(0, 2) : null;
		const id: string | null = parseURL[2] ? parseURL[2] : null;
		

		if (!api || api.join('/') !== 'api/users') {
			console.log('api');
			this.sendErr(res);
			return;
		}

		if (id) {
			const user: User | null = this.database.getOneUser(id);
			if (user) {
				res.statusCode = StatusCodes.OK;
				res.write(JSON.stringify(
				{
					status: StatusCodes.OK,
					data: user
				}));
			} else {
				res.statusCode = StatusCodes.Undefined;
				res.write(JSON.stringify({
					status: StatusCodes.Undefined,
					data: 'User does not exits!'
				}));
			}
			res.end();

		} else {
			const allUsers: Array<User> = this.database.getAllUsers();
			res.statusCode = StatusCodes.OK;
			res.write(JSON.stringify(
				{
					status: StatusCodes.OK,
					data: allUsers
				}));
			res.end();
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