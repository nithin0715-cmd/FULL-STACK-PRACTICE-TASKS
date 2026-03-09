import { useState } from "react";
import "./App.css";

const data = [
  { id: 1, name: "Alice", department: "IT", date: "2024-01-10" },
  { id: 2, name: "Bob", department: "HR", date: "2023-12-05" },
  { id: 3, name: "Charlie", department: "Finance", date: "2024-02-20" },
  { id: 4, name: "David", department: "IT", date: "2023-11-15" }
];

function App() {
  const [records, setRecords] = useState(data);
  const [department, setDepartment] = useState("All");

   // Sorting
  const sortByName = () => {
    const sorted = [...records].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setRecords(sorted);
  };

  const sortByDate = () => {
    const sorted = [...records].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setRecords(sorted);
  };

  // Filtering
  const filteredRecords =
    department === "All"
      ? records
      : records.filter(r => r.department === department);

  // Count per department
  const departmentCount = records.reduce((acc, curr) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container">
      <h1>Data Retrieval & Sorting Dashboard</h1>

      <div className="controls">
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByDate}>Sort by Date</button>

        <select onChange={(e) => setDepartment(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <h2>Department Count</h2>
      <ul>
        {Object.entries(departmentCount).map(([dept, count]) => (
          <li key={dept}>{dept}: {count}</li>
        ))}
      </ul>

      <h2>Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.department}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

