import User from "models/user";

export default class UserChecker {
	private isTrue: boolean;

	constructor(user: User) {
		this.checker(user);
	}

	private checker(user: User): void {
		try {
			const id =  user.id;
			if (!id) throw new Error('Field is wrong');
			const age = user.age;
			if (!age) throw new Error('Field is wrong');
			const name = user.username;
			if (!name) throw new Error('Field is wrong');
			const hobbies = user.hobbies;
			if (!hobbies) throw new Error('Field is wrong');
			this.isTrue = true;
		} catch (err) {
			this.isTrue = false;
		}
	}

	public result(): boolean {
		return this.isTrue;
	}
}