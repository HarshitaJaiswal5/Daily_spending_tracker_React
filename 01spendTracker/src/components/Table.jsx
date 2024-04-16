import React from 'react';

function Table({ spendings, onDelete }) {
  return (
    <table className='w-full'>
      <thead className='text-2xl font-serif w-full'>
        <tr className='w-full flex justify-evenly'>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {spendings.map((spending, index) => (
          <tr key={index} className='my-2 flex justify-evenly'>
            <td>{spending.title}</td>
            <td>{spending.amount}</td>
            <td>{spending.date}</td>
            <td>{spending.time}</td>
            <td>
              <button onClick={() => onDelete(index)}> &times;</button> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
