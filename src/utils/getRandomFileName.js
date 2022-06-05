import random from './random';

export default function getRandomFileName(files) {
	const list = Array.from(files);
	const fileNames = [];
	list.forEach(() => {
		const name = random(20);
		fileNames.push(`${name}`);
	});
	return fileNames;
}