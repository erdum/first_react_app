import TextField from '@mui/material/TextField';
import {useEffect, useRef, useState} from "react";
import getToken from "utils/getToken";
import {createRows} from "utils/crud";

export default function DataGridSearchBar({url, setData, columns}) {
	const [searchValue, setSearchValue] = useState(null);
	const initialRender = useRef(true);
	const oldTimer = useRef(null);
	const prevData = useRef(null);

	useEffect(() => {
		let active = true; // is component mounted successfully.

		if (initialRender.current || !searchValue) {
			initialRender.current = false;
			return undefined;
		}

		clearTimeout(oldTimer?.current);

		oldTimer.current = setTimeout(async () => {
			const req = await fetch(`${url}?q=${searchValue}`, {
				headers: {
					'Authorization': `Bearer ${getToken()}`
				}
			});

			if (req.status === 200) {
				const searchResult = await req.json();

				// check component is mounted and alive
				if (active) {
					const rows = searchResult[0].map((row) => createRows(row, columns));
					setData((prevState) => ({ ...prevState, paginate: false, rows}));
					// setData((prevState) => ({...prevState}));
				}
			}

		}, 1000);

		return () => {
			active = false; // when component is unmounted prevent any state update
		};
		//
	}, [searchValue]);

	return (
		<TextField
			value={searchValue ?? 'Search Colleges'}
			onInput={(event) => setSearchValue(event.target?.value)}
			sx={{width: '40%', mb: 2}}
			// InputProps={{
			// 	endAdornment: (
			// 		<>
			// 			{loading && <CircularProgress color="inherit" size={20}/>}
			// 		</>
			// 	)
			// }}
		/>
	);
}
