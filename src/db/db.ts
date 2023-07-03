import DB from '../models/db';
import User from '../models/user';

export class DataBase {
	private database: DB;	

	constructor() {
		this.database = [] as DB;
	}

	public addUser(user: User): User | null {
		if (this.database.find((item: User) => item.id === user.id)) {
			return null;
		}

		this.database.push(user);
		console.log(this.database);
		return user;
	}

	public getAllUsers(): DB {
		return this.database;
	}

	public getOneUser(id: string): User | null {
		const user: User | undefined = this.database.find((user: User) => user.id === id);

		return user ? user : null;
	}

	public updateUser(user: User): User | null {
		const userIndex: number = this.database.findIndex((item: User) => item.id === user.id);

		if (userIndex == -1) return null;
		const returnUser = { ...this.database[userIndex], ... user };
		return returnUser;
	}

	public deleteUser(user: User): boolean {
		const indexUser = this.database.findIndex((item: User) => item.id === user.id);

		if (indexUser == -1) return false;

		this.database = [...this.database.slice(0, indexUser), ...this.database.slice(indexUser + 1)];

		return true;
	}
}

export const database = new DataBase();