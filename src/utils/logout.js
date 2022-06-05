import getToken from './getToken';

const URL = `${process.env.REACT_APP_BASE_URL}/logout`;

export default async function doLogout(setLogout) {
	let res = await fetch(URL, {
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	});
	res = await res.json();
	if (res.message === 'success') {
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('userData');
		setLogout(true);
		window.location = '/admin';
	}
}
