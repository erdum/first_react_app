export default async function getAvatar(username) {
	const API = `https://avatars.dicebear.com/api/initails/${username}.svg`;
	let res = await fetch(API);
	res = await res.blob();
	res = URL.createObjectURL(res);
	return res;
}