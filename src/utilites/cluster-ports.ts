export default class GeneratePorts {
	private ports: Array<string>;
	constructor(port: string, paralellism: number) {
		const portInNumber = Number(port);
		this.generate(portInNumber, paralellism);
	}

	private generate(port: number, paralelism: number): void {
		for (let i = 1; i <= paralelism; i += 1) {
			this.ports.push(String(port + i));
		}
	}

	public getPorts(): Array<string> {
		return this.ports;
	}
}