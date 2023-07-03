import { IncomingMessage, ServerResponse } from 'node:http';
import { database, DataBase } from '../db/db';
import User from '../models/user';
import StatusCodes from '../models/status-codes';
import UserChecker from '../utilites/user-checker';

export default class PostHandler {
	private database: DataBase;

	constructor(req: IncomingMessage, res: ServerResponse) {
		this.database = database;
		this.handler(req, res);
	}

	private handler(req: IncomingMessage, res: ServerResponse): void {
		req.on('data', (data) => {
			const dataResived: string = data.toString();		
			const user = JSON.parse(dataResived) as User;

			if (new UserChecker(user).result()) {
				
				const result: User | null = this.database.addUser(user);

				console.log(result);
				if (result) {
					res.statusCode = StatusCodes.Created;
					res.write(JSON.stringify(
						{
							status: StatusCodes.Created,
							data: result
						}
					));
					res.end();
				} else {
					this.sendErr(res);
				}

			} else {
				this.sendErr(res);
			}
		})
	}
	

	private sendErr(res: ServerResponse): void {
		res.statusCode = StatusCodes.Invalid;
		res.write(JSON.stringify(
			{
				status: StatusCodes.Undefined,
				data: 'Wrong API request'
			}
		));
		res.end();
	}
}