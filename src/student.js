import React from "react";
import { useState} from "react";


function Addstudent() {
    const [form, setForm] = useState({
        name: '',
        rollNo: '',
        age: '',
        dob: '',
        course: '',
    });
    const [error, setError] = useState('');         

    const [students, setStudents] = useState(() => {
        const raw = localStorage.getItem("addStudent");
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed)) return parsed;
            if (parsed && typeof parsed === "object") return [parsed];
            return [];
        } catch {
            return [];
        }
    });
    const [editIndex, setEditIndex]=useState(null);
    // useEffect(()=>{
    //     localStorage.setItem('addStudent', JSON.stringify(form));
    // }, [form]);


    function handleChange(e) {
        const { name, value } = e.target;

        setForm(prev => ({ ...prev, [name]: value }));

        if (!value.trim()) {
            setError('This field is required.');
          } else {
            setError('');
          }
        };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!error) {
            // Submit form
          }
        console.log('Form submitted:', form);
        let updateForm;
        if (editIndex !== null){
            updateForm = students.map((s, i) => (i === editIndex ? form : s));
            setEditIndex(null);
        }else {
            updateForm = [...students, form];
        }

        // const existing = JSON.parse(localStorage.getItem("addStudent")) || [];

        setStudents(updateForm);

        localStorage.setItem("addStudent", JSON.stringify(updateForm));

        setForm({ name: "", rollNo: "", age: "", dob: "", course: "" });
    };

    const handleEdit = (index) => {
        setForm(students[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updated = students.filter((_, i) => i !== index);
        setStudents(updated);
        localStorage.setItem("addStudent", JSON.stringify(updated));
    };

    return (
        <>
            <div className="add-student">
                <form method="post" onSubmit={handleSubmit}>
                    <label>
                        Name: <input type="text" value={form.name} onChange={handleChange} name="name" />
                    </label>
                    <label>
                        Rollno: <input type="number" value={form.rollNo} onChange={handleChange} name="rollNo" />
                    </label>
                    <label>
                        Age: <input type="number" value={form.age} onChange={handleChange} name="age" />
                    </label>
                    <label>
                        Date of Birth: <input type="date" value={form.dob} onChange={handleChange} name="dob" />
                    </label>
                    <label>
                        Course: <input value={form.course} onChange={handleChange} name="course" />
                    </label>
                    <button type="submit">Add Student</button>
                </form>
            </div>
            <div className="display-student">
                <h3>Students Information:</h3>
                {/* <pre>{JSON.stringify(students, null, 2)}</pre> */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Enrolled On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ texAlign: "center" }}>No students yet</td>
                            </tr>
                        ) : (
                            students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.age}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <button onClick={() => handleEdit(index)}>Edit</button>
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Addstudent;