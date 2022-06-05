import getToken from './getToken';

const createPayload = (data, selectedRows = null) => {
	const payload = {};
	Object.entries(data).forEach((item) => {
		payload[item[0]] = item[1];
	});
	if (selectedRows) {
		payload.rows = selectedRows;
	}
	return payload;
};

const createRows = (row, columns) => {
	const tableRow = {};
	columns.forEach((column) => {
		if (column.type === 'boolean' && (row[column.field] === '0' || row[column.field] === '' || row[column.field] === 0)) {
			tableRow[column.field] = false;
		} else {
			tableRow[column.field] = row[column.field];
		}
	});
	return tableRow;
};

const createRecord = async (url, data, columns, selectedRows, callback = null) => {
	let payload;
	let reqMethod = 'post';
	if (data.isUpdate) {
		reqMethod = 'put';
		payload = createPayload(data, selectedRows);
	} else {
		payload = createPayload(data);
	}
	const res = await fetch(url, {
		method: reqMethod,
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (res.status !== 200) alert('Unexpected error ocurred!');
	callback();
};

const paginateRows = async (url, page) => {
	let res = await fetch(`${url}?page=${page}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`
		}
	});
	if (res.status === 200) {
		res = await res.json();
	} else {
		res = [[], 0];
	}
	return res;
};

const readRecord = async (URL, columns, setRowsState, rowsState = null, paginate = false) => {
	if (!paginate) {
		let res = await fetch(URL, {
			headers: {
				Authorization: `Bearer ${getToken()}`,
				Accept: 'application/json'
			}
		});
		if (res.status === 200) {
			res = await res.json();
			const rows = res.map((row) => createRows(row, columns));
			setRowsState((prevState) => ({ ...prevState, rows }));
		}

		setRowsState((prevState) => ({ ...prevState, loading: false }));
		return true;
	}

	const [newRows, rowsCount] = await paginateRows(URL, rowsState.page);
	setRowsState((prev) => ({ ...prev, loading: false, rows: newRows, count: rowsCount }));
	return true;
};

const deleteRecord = async (url, selectedRows, callback = null) => {
	const rowsToBeEffected = selectedRows;
	const res = await fetch(url, {
		method: 'delete',
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ rows: rowsToBeEffected })
	});

	if (res.status !== 200) alert('Unexpected error ocurred!');
	callback();
};

export { createRecord, readRecord, deleteRecord, createRows };
