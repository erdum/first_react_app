import getToken from './getToken';

export default async function uploadFiles(files, names) {
	const payload = new FormData();
	for (let i = 0; i < files.length; i+=1) {
		const extension = files[i].name.split('.').at(-1);
		payload.append(`file${i}`, files[i], `${names[i]}.${extension}`);
	}
	const res = await fetch(`${process.env.REACT_APP_BASE_URL}/file`, {
		method: 'post',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: payload
	});
	if (res.status === 200) {
		return true;
	}
	return null;
}
