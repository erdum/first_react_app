import {
	DataGrid,
	GridActionsCellItem,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton
} from '@mui/x-data-grid';
import {getData} from 'utils/cacheData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './table.css';

function DataTable({
	                   columns,
	                   rows,
	                   dataHandler,
	                   paginate,
	                   rowsState,
	                   setRowsState,
	                   deleteHandler,
	                   editHandler,
	                   edit,
	                   destroy,
	                   selection,
	                   serverFiltering,
	                   filterModelChangeHandler = null
                   }) {
	const renderActions = (params) => {
		const result = [];
		if (edit) result.push(<GridActionsCellItem icon={<EditIcon/>} label="Edit"
		                                           onClick={() => editHandler(params)}/>);
		if (destroy) result.push(<GridActionsCellItem icon={<DeleteIcon/>} label="Delete"
		                                              onClick={() => deleteHandler(params)}/>);
		return result;
	};

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton/>
				<GridToolbarFilterButton/>
				{getData()?.roles === 'Admin' && <GridToolbarExport/>}
			</GridToolbarContainer>
		);
	}

	columns = [
		{
			field: 'actions',
			type: 'actions',
			width: 80,
			getActions: renderActions
		},
		...columns
	];

	return (
		<>
			{paginate ? (
				<div style={{height: 600, width: '100%'}}>
					<DataGrid
						sx={{backgroundColor: 'white'}}
						rows={rows}
						columns={columns}
						pageSize={rowsState.pageSize}
						rowsPerPageOptions={[rowsState.pageSize]}
						checkboxSelection={selection}
						onSelectionModelChange={dataHandler}
						components={{
							Toolbar: CustomToolbar
						}}
						pagination
						rowCount={rowsState.count}
						{...rowsState}
						paginationMode="server"
						onPageChange={(page) => setRowsState((prev) => ({...prev, page}))}
						onPageSizeChange={(pageSize) => setRowsState((prev) => ({...prev, pageSize}))}
						filterMode={serverFiltering ? 'server' : 'client'}
						onFilterModelChange={serverFiltering ? filterModelChangeHandler : null}
					/>
				</div>
			) : (
				<div style={{height: 600, width: '100%'}}>
					<DataGrid
						sx={{backgroundColor: 'white'}}
						rows={rows}
						columns={columns}
						loading={rowsState.loading}
						pageSize={rowsState.pageSize}
						rowsPerPageOptions={[rowsState.pageSize]}
						checkboxSelection={selection}
						onSelectionModelChange={dataHandler}
						components={{
							Toolbar: CustomToolbar
						}}
						filterMode={serverFiltering ? 'server' : 'client'}
						onFilterModelChange={serverFiltering ? filterModelChangeHandler : null}
					/>
				</div>
			)}
		</>
	);
}

export default DataTable;
