import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

import GeneratePorts from './utilites/cluster-ports';
import handlerServer from './utilites/handlerServer';
import raiseServer from './utilites/serverHandler';

const multi: Array<string> = process.argv[2] ? process.argv[2]?.split(' '): [''];

const portArr: string | null = multi.length > 2 ? multi[2] : null;
let port = Number(portArr) ? portArr : null; 

if (!port) {	
	port = process.env.PORT || '3000';	
	raiseServer(port, handlerServer);

} else {
	const paralellism = availableParallelism();
	const portsClusters: Array<string> = new GeneratePorts(port as string, paralellism).getPorts();
	let serverIndex: number;

	if (cluster.isPrimary) {

		for (let i = 0; i < paralellism; i += 1) {
			const worker = cluster.fork();
			serverIndex = i;
			worker.on('exit', () => { 
				console.log(`Worker on ${port} was exit`);
				cluster.fork();
			});
		}
	} else {
		raiseServer(portsClusters[serverIndex], handlerServer);
	}
}