import React from 'react';
import MaterialTable from 'material-table';
import {EditorInterface} from './EditorInterface.js';

export default function ModelTable( props ) {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Entity ID', field: 'entity_id', editable: 'never'},
            { title: 'Name', field: 'name'},
            { title: 'Model ID', field: 'model_id', type: 'numeric' },
            { title: 'Tx', field: 'tx', initialEditValue : "0" },
            { title: 'Ty', field: 'ty', initialEditValue : "0" },
            { title: 'Tz', field: 'tz', initialEditValue : "0" },
            { title: 'Rx', field: 'rx', initialEditValue : "1" },
            { title: 'Ry', field: 'ry', initialEditValue : "1" },
            { title: 'Rz', field: 'rz', initialEditValue : "1" },
            { title: 'Sx', field: 'sx', initialEditValue : "1" },
            { title: 'Sy', field: 'sy', initialEditValue : "1" },
            { title: 'Sz', field: 'sz', initialEditValue : "1" },
        ],
        data: []
    });

    return (
        <div>
        <MaterialTable
            title="Current Entities"
            columns={state.columns}
            data={props.messages}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {

                            EditorInterface.addModel( newData, props.wsc )
                            resolve()
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            
                            const data = state.data;
                            const index = data.indexOf(oldData);
                            data[index] = newData;

                            EditorInterface.editModel( newData, props.wsc );

                            setState({ ...state, data });
                            
                            resolve()
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            
                            let data = state.data;
                            const index = data.indexOf(oldData);
                            data.splice(index, 1);
                            setState({ ...state, data });
                            
                            resolve()
                        }, 1000)
                    }),
            }}
        />
        </div>
    );
}
