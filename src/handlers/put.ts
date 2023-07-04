import { IncomingMessage, ServerResponse } from 'node:http';
import { database, DataBase } from '../db/db';
import User from '../models/user';
import StatusCodes from '../models/status-codes';
import UserChecker from '../utilites/user-checker';

export default class PutHandler {
	private database: DataBase;
	constructor(req: IncomingMessage, res: ServerResponse) {
		this.database = database;
		this.handler(req, res);
	}

	private handler(req: IncomingMessage, res: ServerResponse): void {

		const reqArr = req.url.split('/').slice(1);

		console.log(reqArr);

		if (reqArr.length < 3) {
			this.sendErr(res);
			return;
		}

		const id = reqArr[2];
		const api = reqArr.slice(0, 2).join('/');

		if (api !== 'api/users') {
			this.sendErr(res);
			return;
		}

		if (!id) {
			this.sendErr(res);
			return;
		} else {
			req.on('data', (data: Buffer) => {
				const userData: string = data.toString();
				const newUser = JSON.parse(userData) as User;

				if (id !== newUser.id) {
					this.sendErr(res);
					return;
				}

				if (new UserChecker(newUser).result()) {
					const result: User | null = this.database.updateUser(id, newUser);
					if (result) {
						res.statusCode = StatusCodes.OK;
						res.write(JSON.stringify({
							status: StatusCodes.OK,
							data: result
						}));
						res.end();
					} else {
						res.statusCode = StatusCodes.Undefined;
						res.write(JSON.stringify(
							{
								status: StatusCodes.Undefined,
								data: 'User does not exits'
							}
						));
						res.end();
					}
				} else {
					this.sendErr(res);
				}
			});
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