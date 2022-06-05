import MFCD from 'ui-component/MFCD';

const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Name', width: 400, lock: true},
    {field: 'slug', headerName: 'Slug', width: 400, lock: true},
    {
        field: 'custom',
        lock: true,
        type: 'lock',
		hide: true
    }
];

const URL = `${process.env.REACT_APP_BASE_URL}/colleges`;

const subpagesProps = {
    columns: [
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'posted_by',
            headerName: 'Posted By',
            lock: true
        },
        {
            field: 'title',
            headerName: 'Title',
        },
        {
            field: 'slug',
            headerName: 'Slug',
        },
        {
            field: 'content',
            headerName: 'Content',
            type: 'freeText'
        },
        {
            field: 'tab_name',
            headerName: 'Tab Name',
        },
        {
            field: 'type',
            headerName: 'Type',
        },
        {
            field: 'meta_title',
            headerName: 'Meta Title',
        },
        {
            field: 'meta_description',
            headerName: 'Meta Description',
        },
    ],
    url: `${process.env.REACT_APP_BASE_URL}/colleges/subpage`,
    title: 'Subpages'
};

const Subpage = ({columns, url, title, paginate, row}) => {
    if (row) {
        return (
            <div style={{marginTop: '4rem'}}>
                <MFCD columns={columns} url={`${url}?id=${row?.id}`} title={title} paginate={paginate}/>
            </div>
        );
    }

    return null;
}

export default function Subpages () {
    return (
        <>
            <MFCD columns={columns} url={URL} title="" create={false} destroy={false} selection={false} paginate CustomInput={Subpage}
                  customInputProps={subpagesProps} serverFiltering/>
        </>
    );
}
