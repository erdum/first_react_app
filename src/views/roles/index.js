import MFCD from 'ui-component/MFCD';

const parsePermissions = ({ value }) => {
    let output = '';
    value.forEach((item, index) => {
        if (index + 1 === value.length) {
            output += item;
        } else {
            output += `${item}, `;
        }
    });
    return output;
};

const columns = [
    { field: 'id', headerName: 'ID', width: 140 },
    { field: 'roles', headerName: 'Role', width: 140 },
    {
        field: 'permissions',
        headerName: 'Permissions',
        width: 250,
        type: 'search',
        options: '/permissions-list',
        multiple: true,
        valueGetter: parsePermissions
    }
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/roles`;

export default function Roles() {
    return <MFCD columns={columns} url={URL} title="Roles" />;
}
