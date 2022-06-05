export default function cacheData(userData) {
	try {
		sessionStorage.setItem('userData', JSON.stringify(userData));
		return true;
	} catch (err) {
		return err;
	}
}

export function getData() {
	if (sessionStorage.getItem('userData')) {
		return JSON.parse(sessionStorage.getItem('userData'));
	}
	return null;
}