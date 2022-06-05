export default function checkAuthorization(res) {
	if (res.status === 200) {
		return res.json();
	}
	console.log(res.status);
	return false;
};