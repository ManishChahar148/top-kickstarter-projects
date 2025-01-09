import React, { useEffect, useState } from 'react';
import './style.css';
import Pagination from '../../components/Pagination';

const ListProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    // Fetch data from the API
    fetch(
      'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data); // Set the fetched data to the state
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Calculate the data to display for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Highly-Rated Kickstarter Projects</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project) => (
              <tr key={project['s.no']}>
                <td>{project['s.no']}</td>
                <td>{project['percentage.funded']}%</td>
                <td>${project['amt.pledged'].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className="footer">
        <p>&copy; 2025 Kickstarter Projects. All rights reserved.</p>
      </div>
    </>
  );
};

export default ListProjects;
