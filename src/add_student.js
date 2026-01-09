import React from "react";
import { useState } from "react";
import { useLocalStorageArray } from "./local_storage";
import './App.css';

function AddStudent() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        rollNo: "",
        age: "",
        enrolledOn: "",

    });

    const [students, setStudents] = useLocalStorageArray("addStudent");
    const handleChange = (e) => {
        const target = e.target;
        const { name, value } = target;

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        const updated = [...students, formData];
        setStudents(updated);

        setFormData({ name: "", dob: "", age: "", rollNo: "", enrolledOn: "" });

    };

    return (
        <>
            <div className="add-student">
                <form method="post" onSubmit={handleSubmit}>
                    <label>
                        Name: <input type="text" value={formData.name} onChange={handleChange} name="name" required />
                    </label>
                    <label>
                        Date of birth: <input type="date" value={formData.dob} onChange={handleChange} name="dob" required max="2010-01-01" />
                    </label>
                    <label>
                        Age: <input type="number" value={formData.age} onChange={handleChange} name="age" required min="1" step="1" placeholder="Enter age (positive)" />
                    </label>
                    <label>
                       ID : <input type="number" value={formData.rollNo} onChange={handleChange} name="rollNo" required min="1" step="1" placeholder="Enter Id (positive)" />
                    </label>
                    <label>
                        Enrolled On: <input type="text" value={formData.enrolledOn} onChange={handleChange} name="enrolledOn" required />
                    </label>
                    <button type="submit"> Add Student </button>
                </form>

            </div>
        </>
    );
}

export default AddStudent;