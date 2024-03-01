import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function DistrictTable({stateData}){
    
    const columns = stateData.map((obj)=> ({
        district: obj.DISTRICT,
        state_senator: obj.State_Senator,
        party: obj.State_Senator_Party
    }))
    
    const rows = [
        {field: 'district', headerName: 'District', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'party', headerName: 'Party', width: 100 },
    ]
    
    return (
        <DataGrid rows={rows} columns={columns} />
    )
}