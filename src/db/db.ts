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

		return user;
	}

	public getAllUsers(): DB {
		return this.database;
	}

	public getOneUser(id: string): User | null {
		const user: User | undefined = this.database.find((user: User) => user.id === id);

		return user ? user : null;
	}

	public updateUser(id: string, user: User): User | null {
		const userIndex: number = this.database.findIndex((item: User) => item.id === id);

		if (userIndex == -1) return null;
		this.database[userIndex] = { ...this.database[userIndex], ... user };
		return user;
	}

	public deleteUser(id: string | number): User | null {
		const indexUser = this.database.findIndex((item: User) => item.id === id);

		if (indexUser == -1) return null;

		const user: User = this.database[indexUser];

		this.database = [...this.database.slice(0, indexUser), ...this.database.slice(indexUser + 1)];

		return user;
	}
}

export const database = new DataBase();