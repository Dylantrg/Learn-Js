import React, { useState, useEffect } from "react";

const users = [
  { name: "Harry", age: 10 },
  { name: "DOnald", age: 12 },
];
const test = [true, false];
function fakeApi(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldFail) {
        let id = Math.floor(Math.random() * 2);
        resolve(users[id]);
      } else {
        reject(new Error("Load info failed"));
      }
    }, 1000);
  });
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const user = await fakeApi();
      setUsers((prevUser) => [...prevUser, user]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading user...</p>;
  } else if (error) {
    return (
      <>
        <button onClick={handleClick}>click</button>
        <p>Error: {error}</p>
      </>
    );
  } else if (users.length === 0) {
    return (
      <>
        <button onClick={handleClick}>click</button>
        <p> Dashboard </p>
      </>
    );
  }
  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleClick}>click</button>
      <ul>
        {users.map((u, index) => (
          <li key={index}>
            name: {u.name}, age: {u.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
