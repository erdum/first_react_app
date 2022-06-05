import { useState, useEffect, forwardRef, cloneElement, useRef } from 'react';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Skeleton from '@mui/material/Skeleton';
import { Editor } from '@tinymce/tinymce-react';
import { List as ListV } from 'react-virtualized';
import getOptions from 'utils/getOptions';
import swapLabelWithValue from 'utils/swapLabelWithValue';

const ListboxComponent = forwardRef((props, ref) => {
	const { children, role, ...other } = props;
	const itemCount = Array.isArray(children) ? children.length : 0;

	return (
		<div ref={ref}>
			<div {...other}>
				<ListV
					height={250}
					width={300}
					rowHeight={100}
					overscanCount={5}
					rowCount={itemCount}
					rowRenderer={(props) =>
						cloneElement(children[props.index], {
							style: props.style
						})
					}
					role={role}
				/>
			</div>
		</div>
	);
});

const InlineEditor = ({ value, setValue, fieldName }) => {
	const [editorIsLoading, setEditorLoading] = useState(true);
	const editorRef = useRef(null);

	return (
		<>
			{editorIsLoading && <Skeleton animation="wave" variant="rectangular" width="100%" height={100} />}
			<Editor
				apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
				onInit={(evt, editor) => {
					setEditorLoading(false);
					editorRef.current = editor;
				}}
				onEditorChange={(text) => {
					setValue((prevState) => ({ ...prevState, [fieldName]: text }));
				}}
				value={value}
				init={{
					width: '100%',
					mobile: {
						menubar: true,
						toolbar_mode: 'sliding',
						theme: 'mobile'
					},
					selector: 'textarea#image-tools',
					height: 500,
					convert_urls: false,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste imagetools wordcount'
					],
					toolbar:
						'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>
		</>
	);
};

export default function ActionItem({ row, setFields, fields }) {
	const searchTimer = useRef(null);
	const [autocompleteData, setAutocompleteData] = useState({
		isOpen: false,
		options: [],
		url: '',
		label: ''
	});
	const loading = autocompleteData.isOpen && autocompleteData.options.length === 0;

	useEffect(() => {
		if (loading) getOptions(setAutocompleteData, autocompleteData.url);
	}, [loading, autocompleteData.url]);

	useEffect(() => {
		if (row.options) {
			if (typeof row.options === 'string') setAutocompleteData((prevState) => ({ ...prevState, url: row.options }));
			if (typeof row.options === 'object') setAutocompleteData((prevState) => ({ ...prevState, options: row.options }));
		}
		// eslint-disable-next-line
	}, [autocompleteData.isOpen]);

	useEffect(() => {
		if (autocompleteData.label.length > 0 && row.lazyLoad) {
			setAutocompleteData((prevState) => ({ ...prevState, isOpen: true }));
			if (searchTimer.current) clearTimeout(searchTimer.current);
			searchTimer.current = setTimeout(() => {
				getOptions(setAutocompleteData, autocompleteData.url, autocompleteData.label);
			}, 1200);
		}
		// eslint-disable-next-line
	}, [autocompleteData.label]);

	if (row.type === 'boolean') {
		return (
			<ListItem disablePadding sx={{ my: 2 }}>
				<FormControlLabel
					sx={{ marginLeft: 1 }}
					control={
						<Checkbox
							onChange={(e) => {
								setFields((prevState) => ({ ...prevState, [row.field]: e.target.checked }));
							}}
						/>
					}
					label={row.field}
					labelPlacement="end"
				/>
			</ListItem>
		);
	}

	if (row.type === 'file') {
		return (
			<ListItem disablePadding sx={{ my: 2 }}>
				<TextField
					onChange={(event) => {
						setFields((prevState) => ({ ...prevState, [row.field]: event.target.files }));
					}}
					id={row.field}
					helperText={row.headerName}
					variant="outlined"
					type="file"
					inputProps={{ multiple: row?.multiple ?? true }}
				/>
			</ListItem>
		);
	}

	if (row.type === 'search') {
		return (
			<ListItem disablePadding sx={{ my: 2 }}>
				<Autocomplete
					defaultValue={fields?.[row.field]}
					multiple={row.multiple}
					sx={{ width: '100%' }}
					open={autocompleteData.isOpen}
					onOpen={() => {
						if (!row.lazyLoad || autocompleteData.options.length > 0)
						setAutocompleteData((prevState) => ({ ...prevState, isOpen: true }));
					}}
					onClose={() => {
						setAutocompleteData((prevState) => ({ ...prevState, isOpen: false }));
					}}
					options={autocompleteData.options}
					loading={loading}
					onChange={(_event, value) => {
						if (!row.multiple) setFields((prevState) => ({ ...prevState, [row.field]: value?.id }));
						if (row.multiple) {
							const selectedValues = value.map((item) => swapLabelWithValue(item, autocompleteData.options));
							setFields((prevState) => ({ ...prevState, [row.field]: selectedValues }));
						}
					}}
					onInputChange={(_event, value) => {
						setAutocompleteData((prevState) => ({ ...prevState, label: value }));
					}}
					ListboxComponent={ListboxComponent}
					renderInput={(params) => (
						<TextField
							{...params}
							label={row.headerName}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</>
								)
							}}
						/>
					)}
				/>
			</ListItem>
		);
	}

	if (row.type === 'date') {
		return (
			<ListItem disablePadding sx={{ my: 2 }}>
				<TextField
					label={row.headerName}
					type="date"
					value={fields?.[row.field] ?? ''}
					onChange={(e) => setFields((prevState) => ({ ...prevState, [row.field]: e.target.value }))}
					sx={{ width: 220 }}
					InputLabelProps={{
						shrink: true
					}}
				/>
			</ListItem>
		);
	}

	if (row.type === 'freeText') {
		return (
			<ListItem disablePadding sx={{ my: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
			<Typography variant="h4" sx={{ color: 'gray', mb: 2, ml: 1.5 }}>{row.headerName}</Typography>
				<InlineEditor value={fields?.[row.field]} setValue={setFields} fieldName={row.field} />
			</ListItem>
		);
	}

	return (
		<ListItem disablePadding sx={{ my: 2 }}>
			<TextField
				fullWidth
				value={fields?.[row.field] ?? ''}
				onChange={(e) => {
					setFields((prevState) => ({ ...prevState, [row.field]: e.target.value }));
				}}
				label={row.headerName}
				type="text"
				variant="outlined"
			/>
		</ListItem>
	);
}
