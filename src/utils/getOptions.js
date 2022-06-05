export default async function getOptions(setOptions, url, query = '') {
	let rows;
	let output;

	try {
		rows = await fetch(`${process.env.REACT_APP_BASE_URL}${url}?text=${query}`);
		if (rows.status === 200) {
			rows = await rows.json();
		} else {
			rows = null;
		}
	} catch (err) {
		return err;
	}

	if (rows) {
		output = rows.map((item) => ({ label: item[0], id: item[1] }));
		setOptions((prevState) => ({ ...prevState, options: output }));
	} else {
		setOptions((prevState) => ({ ...prevState, options: [] }));
	}
	return null;
}
