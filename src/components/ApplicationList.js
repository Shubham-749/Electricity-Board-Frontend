import React from 'react';
import { useTable } from 'react-table';
import { ActionEnum, ApplicationStatusEnum, CommentEnum } from '../Enum'; // Adjust the import path based on your project structure

import { useNavigate } from 'react-router-dom';

const ApplicationList = ({ data }) => {
  const navigate = useNavigate();
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID', accessor: 'id',
        Cell: props => <div onClick={() =>
          onApplicationClick(props.cell.row.original)}>{props.value}</div>
      },
      { Header: 'Load Value', accessor: 'loadVal',
      Cell: props => <div onClick={() =>
        onApplicationClick(props.cell.row.original)}>{props.value}</div> },
      { Header: 'Application Date', accessor: 'dateOfApplication', Cell: ({ value }) => new Date(value).toLocaleString() 
      ,
      Cell: props => <div onClick={() =>
        onApplicationClick(props.cell.row.original)}>{props.value}</div>},
      { Header: 'Status', accessor: 'status' ,
      Cell: props => <div onClick={() =>
        onApplicationClick(props.cell.row.original)}>{props.value}</div>},
      {
        Header: 'Action',
        accessor: 'actionId',
        Cell: ({ row }) =>
          row.original.status !== ApplicationStatusEnum.APPROVED ? (
            <select >
              <option value="">Select Action</option>
              {Object.values(ActionEnum).map((action) => (
                <option key={action} value={action}>
                  {action}
                </option>
              ))}
            </select>
          ) : (
            'N/A'
          ),
      },
      {
        Header: 'Comment',
        accessor: 'commentId',
        Cell: ({ row }) =>
          row.original.status !== ApplicationStatusEnum.APPROVED ? (
            <select>
              <option value="">Select Comment</option>
              {Object.values(CommentEnum).map((comment) => (
                <option key={comment} value={comment}>
                  {comment}
                </option>
              ))}
            </select>
          ) : (
            'N/A'
          ),
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
    const onApplicationClick = (application) => {
      console.log(application);
      navigate(`application/${application.id}`, {state: application});
    }

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
            {...row.getRowProps()}
            style={{ cursor: 'pointer' }}
          >
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ApplicationList;
