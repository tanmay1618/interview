import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './datatable.scss';
import { getList } from './apis/api';
import { Link } from 'react-router-dom';


const columns = [
    {
        "field": "id",
        "headerName": "ID"
    },
    {
        "field": "name",
        "headerName": "Candidate Name"
    },
    {
        "field": "interview_date",
        "headerName": "Interview Date"
    },
    {
        "field": "interview_time",
        "headerName": "Interview Time"
    },
    {
        "field": "type",
        "headerName": "Interview Type"
    },
    {
        "field": "interviewer_id",
        "headerName": "Interviewer"
    },
    {
        field: 'action',
        headerName: 'Feeback Link',
        width: 170,
        renderCell: (params) => (
            <div className="action">
                <Link to={params.row.type === 'Frontend' ? '/interview-form/frontend/'+params.row.id : '/interview-form/'+params.row.id}>
                    <button type="button" className="view_btn">
                        Feedback
                    </button>
                </Link>
            </div>
        ),
    },
 ]


function InterviewTable() {
    const [data, setData] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);

    useEffect(() => {
        fetchProducts();  // Call the async function
    },[]);

    const addProduct = () =>{
        setShowProductModal(true);
    }
    
    const fetchProducts = async ()=>{
        const products = await getList("interview_feedback")
        setData(products);
    }

    const closeModal=()=>{
        fetchProducts();
        setShowProductModal(false);
    }


    return (
        <div className="data_table">
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default InterviewTable;

