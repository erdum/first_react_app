import MFCD from 'ui-component/MFCD';
import {useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import {CircularProgress} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import UploadIcon from '@mui/icons-material/Upload';
import getRandomFileName from "utils/getRandomFileName";
import uploadFiles from "utils/uploadFiles";
import getToken from "utils/getToken";

const CustomUploadButton = ({params: {row: {id}}}) => {
    const [isUploading, setUploading] = useState(false);
    const hiddenFileInput = useRef(null);

    const fileHandler = async event => {
        const files = event.target.files;
        const filenames = getRandomFileName(files);
        setUploading(true);
        const fileUploaded = await uploadFiles(files, filenames);
        if (fileUploaded) {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/managment/logos`, {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({logo: filenames[0], college_id: id})
            });

            if (res.status === 200) {
                setUploading(false);
            } else {
                setUploading(false);
                alert('Failed to upload logo try again!');
            }
        } else {
            setUploading(false);
            alert('Failed to upload logo try again!');
        }
    };

    const uploadHandler = () => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <input name="hiddenFileInput" ref={hiddenFileInput}
                   onInput={fileHandler} type="file" style={{display: "none"}}/>
            {isUploading && <CircularProgress/>}
            {!isUploading && <GridActionsCellItem label="Upload Logo" icon={<UploadIcon/>} onClick={uploadHandler}/>}
        </>
    );
};

const parseAvatar = (params) => <Avatar
    src={params.value ? `${process.env.REACT_APP_PUBLIC_URL}photos/${params.value}.webp` : `https://ui-avatars.com/api/?name=${params.row?.name}`}/>;

const renderActions = (params) => [<CustomUploadButton params={params}/>];

const COLUMNS = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'name', headerName: 'Name', width: 450},
    {field: 'logo_path', headerName: 'Logo', width: 80, editable: true, renderCell: parseAvatar},
    {field: 'customActions', type: 'actions', width: 80, value: 0, getActions: renderActions, editable: true}
];

const URL = `${process.env.REACT_APP_BASE_URL}/managment/logos`;

export default function Logos() {
    return <MFCD columns={COLUMNS} url={URL} create={false} edit={false} destroy={false} title="Colleges Logos" selection={false}/>
}