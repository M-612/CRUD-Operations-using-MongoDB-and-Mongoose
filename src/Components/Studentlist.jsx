import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";


function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await api.get("/Students");
            setStudents(res.data); // ✅ this sets data in state
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            await api.delete(`Students/${id}`);
            setStudents(students.filter((s) => s.id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete student");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Student List</h2>
            <button onClick={() => navigate("/add")}>Add Student</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s) => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.age}</td>
                            <td>
                                <button onClick={() => navigate(`/edit/${s.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
