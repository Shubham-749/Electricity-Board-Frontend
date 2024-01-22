import React, { useState, useEffect } from 'react';
import ApplicationList from './components/ApplicationList';
import ApplicationDetail from './components/ApplicationDetail';
import DateFilter from './components/DateFilter';
import SearchBar from './components/SearchBar';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Immediately-invoked async function expression to fetch data
    (async () => {
      try {
        const response = await axios.get('http://localhost:8080/applications/all');
        console.log(response);
        const jsonData = response.data;

        // Assuming the API returns data in the same format
        setData(jsonData);
        setFilteredData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const handleDateFilter = (startDate, endDate) => {
    const filteredByDate = data.filter(application => {
      const applicationDate = new Date(application.dateOfApplication);
      return startDate <= applicationDate && applicationDate <= endDate;
    });
    setFilteredData(filteredByDate);
  };

  const handleSearch = searchTerm => {
    const filteredById = data.filter(application => application.user.id.toString().includes(searchTerm));
    setFilteredData(filteredById);
  };

  return (

<Router>
<div>
  <h1>Electricity Connection Application</h1>
  <Routes>
    <Route
      path="/"
      element={
        <div>
          <DateFilter onChange={handleDateFilter} />
          <SearchBar onSearch={handleSearch} />
          <ApplicationList data={filteredData} />
        </div>
      }
    />
    <Route
      path="/application/:id"
      element={<ApplicationDetail application={selectedApplication} />}
    />
  </Routes>
</div>
</Router>
  );
};

export default App;
