import {useRef, useState} from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ActionItem from 'ui-component/ActionItem';
import findChanges from 'utils/findChanges';

export default function Inputs({
	                               submit,
	                               columns,
	                               fields,
	                               setFields,
	                               closePage,
	                               CustomInput = null,
	                               customInputProps = null
                               }) {
	const [lock, setLock] = useState(false);
	const initialValue = useRef(fields);

	const handleSubmit = () => {
		setLock(true);
		const data = initialValue.current ? findChanges(initialValue.current, fields) : fields;
		if (fields.isUpdate) submit({...data, isUpdate: true}, setLock);
		if (!fields.isUpdate) submit({...data, isUpdate: false}, setLock);
	};

	return (<>
		<List>
			{columns.map((row) => {
				if (row.field === 'custom') {
					return <CustomInput key="customInput" {...customInputProps} row={fields}/>;
				}

				if (row.field !== 'id' && !row.lock) {
					return <ActionItem key={row.field} row={row} setFields={setFields} fields={fields}/>;
				}
				return null;
			})}
		</List>
		<div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<Button
				disabled={lock}
				sx={{
					color: 'secondary.dark',
					backgroundColor: 'white',
					position: 'relative',
					my: 2,
					'&:hover': {backgroundColor: 'secondary.dark', color: 'white'}
				}}
				onClick={handleSubmit}
			>
				Save
				{lock && (<CircularProgress
					size={24}
					sx={{
						position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'
					}}
				/>)}
			</Button>
			<Button
				sx={{
					my: 2,
					color: 'secondary.dark',
					backgroundColor: 'white',
					'&:hover': {backgroundColor: 'secondary.dark', color: 'white'}
				}}
				onClick={() => {
					setFields(null);
					closePage();
				}}
			>
				Cancel
			</Button>
		</div>
	</>);
}
