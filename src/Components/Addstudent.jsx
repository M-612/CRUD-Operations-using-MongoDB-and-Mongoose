import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !age) {
            alert("Please fill all fields");
            return;
        }

        try {
            await api.post("/Students", { name, email, age: Number(age) });
            alert("Student added successfully!");
            navigate("/"); // navigate to StudentList
            window.location.reload(); // ✅ Forces the homepage to reload and fetch data
        } catch (err) {
            console.error(err);
            alert("Failed to add student");
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;
