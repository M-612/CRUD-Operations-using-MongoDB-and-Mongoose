import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        age: ""
    });

    // Fetch student by ID
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await api.get(`/Students/${id}`);
                if (res && res.data) {
                    setStudent({
                        name: res.data.name || "",
                        email: res.data.email || "",
                        age: res.data.age || ""
                    });
                }
            } catch (err) {
                console.error("❌ Error fetching student:", err);
                alert("Failed to fetch student details!");
            }
        };
        fetchStudent();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    // Handle update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/Students/${id}`, {
                name: student.name,
                email: student.email,
                age: Number(student.age)
            });
            alert("✅ Student updated successfully!");
            navigate("/");
        } catch (err) {
            console.error("❌ Error updating student:", err);
            alert("Failed to update student!");
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    value={student.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={student.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={student.age}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
}

export default EditStudent;
