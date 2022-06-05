import {useCallback, useEffect, useRef, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Inputs from 'ui-component/Inputs';
import DataTable from 'ui-component/Table';
import {gridSpacing} from 'store/constant';
import {createRecord, deleteRecord, readRecord} from 'utils/crud';
import uploadFiles from 'utils/uploadFiles';
import getRandomFileName from 'utils/getRandomFileName';

export default function MFCD({
	                             columns,
	                             url,
	                             title,
	                             paginate = false,
	                             CustomInput = null,
	                             customInputProps = null,
	                             create = true,
	                             edit = true,
	                             destroy = true,
	                             selection = true,
	                             serverFiltering = false
                             }) {
	const compRef = useRef({
		isMounted: false,
		prevPage: 0
	});
	const [fields, setFields] = useState(null);
	const [selectedRows, setSelectedRows] = useState(null);
	const [showData, setShowData] = useState(true);
	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: 50,
		rows: [],
		loading: true,
		count: 0,
		paginate
	});
	const [filterValue, setFilterValue] = useState();
	const [isFilterRunning, setFilterRunning] = useState(false);
	const filterValInititalRender = useRef(true);

	useEffect(() => {
		if (compRef.current.isMounted) {
			if (rowsState.paginate && !rowsState.loading && compRef.current.prevPage !== rowsState.page) {
				compRef.current.prevPage = rowsState.page;
				setRowsState((prevState) => ({...prevState, loading: true}));
			} else if (rowsState.loading && !isFilterRunning) {
				readRecord(url, columns, setRowsState, rowsState, rowsState.paginate);
			}
		} else {
			compRef.current.isMounted = true;
			// Initial Fetch
			readRecord(url, columns, setRowsState, rowsState, rowsState.paginate);
		}
		// eslint-disable-next-line
	}, [rowsState.page, rowsState.paginate, rowsState.loading, isFilterRunning]);

	useEffect(() => {
		let active = true;

		if (filterValInititalRender.current) {
			filterValInititalRender.current = false
			return undefined;
		}

		(async () => {
			setFilterRunning(true);
			setRowsState((prevState) => ({...prevState, paginate: false, loading: true}));

			if (!active) return;
			await readRecord(`${url}?q=${filterValue}`, columns, setRowsState);
		})();

		return () => {
			active = false;
		}
	}, [filterValue, columns, url]);

	const dataHandler = (ids) => {
		setSelectedRows(ids);
		if (ids.length > 0) {
			const initialValue = rowsState.rows.filter((item) => item.id === ids[0]);
			setFields(initialValue[0]);
		}
	};

	const ifFilesUploadThem = async (dataObject, callback) => {
		const filesNeedsToBeUpload = {files: [], names: []};
		const list = Object.entries(columns);
		try {
			// eslint-disable-next-line
			list.forEach(async ([_, item]) => {
				if (item.type === 'file' && dataObject[item.field]) {
					const fileNames = getRandomFileName(dataObject[item.field]);
					filesNeedsToBeUpload.files.push(...Array.from(dataObject[item.field]));
					filesNeedsToBeUpload.names.push(...fileNames);
					dataObject[item.field] = fileNames;
				}
			});
			if (filesNeedsToBeUpload.files.length > 0) {
				const filesUploaded = await uploadFiles(filesNeedsToBeUpload.files, filesNeedsToBeUpload.names);
				if (filesUploaded) callback();
			} else {
				callback();
			}
		} catch {
			alert('Failed to upload files');
		}
	};

	const handleSubmit = async (submittedData, setBtnLock) => {
		console.log(submittedData);
		if (Object.entries(submittedData).length <= 1) return alert('All fields are required');

		ifFilesUploadThem(submittedData, () => {
			createRecord(url, submittedData, columns, selectedRows, () => {
				setBtnLock(false);
				setRowsState((prevState) => ({...prevState, loading: true}));
				setShowData(true);
			});
		});

		return true;
	};

	const handleEdit = async (params) => {
		setFields((prevState) => ({...prevState, ...params.row}));
		let rows = [];

		if (selectedRows === null || !selectedRows.includes(params.id)) {
			rows.push(params.id);
		} else {
			rows = [...selectedRows];
		}

		setSelectedRows(rows);

		setFields((prevState) => ({...prevState, isUpdate: true}));
		setShowData(false);
	};

	const handleDelete = async (params) => {
		if (!window.confirm('Confirm Delete!')) return false;
		let rows = [];

		if (selectedRows === null || !selectedRows.includes(params.id)) {
			rows.push(params.id);
		} else {
			rows = [...selectedRows];
		}

		deleteRecord(url, rows, () => {
			setRowsState((prevState) => ({...prevState, loading: true}));
			setShowData(true);
		});
		return true;
	};

	const handleFilterChange = useCallback((filterModel) => {
		if (isFilterRunning && filterModel.items[0].value === undefined) {
			setFilterRunning(false);
			setRowsState((prevState) => ({...prevState, paginate, loading: true}));
		}

		if (filterModel.items[0].value) {
			setFilterValue(filterModel.items[0].value);
		}
	}, [isFilterRunning, paginate]);

	return (
		<>
			<Grid container direction="column" spacing={gridSpacing}>
				<Grid item container justifyContent="space-between" xs={12}>
					<Typography
						sx={{
							color: 'secondary.main'
						}}
						variant="h1"
					>
						{title}
					</Typography>
					{create && (
						<Button
							onClick={() => {
								setFields(null);
								setShowData(false);
							}}
							sx={{
								backgroundColor: 'secondary.main',
								color: 'white',
								'&:hover': {
									backgroundColor: 'secondary.light',
									color: 'secondary.main'
								}
							}}
						>
							Create New {title}
						</Button>
					)}
				</Grid>
				<Grid item xs={12}>
					{showData ? (
						<DataTable
							columns={columns}
							rows={rowsState.rows}
							dataHandler={dataHandler}
							paginate={rowsState.paginate}
							rowsState={rowsState}
							setRowsState={setRowsState}
							deleteHandler={handleDelete}
							editHandler={handleEdit}
							edit={edit}
							destroy={destroy}
							selection={selection}
							serverFiltering={serverFiltering}
							filterModelChangeHandler={handleFilterChange}
						/>
					) : (
						<Inputs
							submit={handleSubmit}
							columns={columns}
							fields={fields}
							setFields={setFields}
							closePage={() => setShowData(true)}
							CustomInput={CustomInput}
							customInputProps={customInputProps}
						/>
					)}
				</Grid>
			</Grid>
		</>
	);
}
