import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = () => {
    onChange(startDate, endDate);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        placeholderText="End Date"
      />
      <button onClick={handleDateChange}>Apply Date Filter</button>
    </div>
  );
};

export default DateFilter;
