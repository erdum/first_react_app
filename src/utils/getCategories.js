export default async function getCategories(options, url) {
	try {
		const res = await fetch(url);
		const rows = await res.json();
		options.category = rows.map((row) => row.title);
		return true;
	} catch (err) {
		return err;
	}
}
