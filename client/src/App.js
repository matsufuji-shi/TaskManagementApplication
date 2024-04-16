import React, { useState } from "react";
import './App.css';
import useCategories from "./hooks/useCategories";
import Axios from 'axios';

function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { categoryList, refreshCategories } = useCategories();

    const addUser = () => {
        Axios.post("http://localhost:3001/api/insert/user", {
            name: name,
            email: email
        }).then(() => {
            alert("User added successfully");
            refreshCategories();  // Refresh the category list
        }).catch(err => {
            console.error("Error adding user: ", err);
            alert("Failed to add user");
        });
    };

    return (
        <div className="App">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
            <button onClick={addUser}>Add User</button>
            <ul>
                {categoryList.map((val, index) => (
                    <li key={index}>
                      名前:{val.name}<br />
                      email:{val.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
