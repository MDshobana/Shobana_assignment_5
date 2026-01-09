import React from "react";
import { useState, useEffect } from "react";
import { useLocalStorageArray } from "./local_storage";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function StudentList() {
    const [students, setStudents, refresh] = useLocalStorageArray("addStudent");

    const [searchTerm, setSearchTerm] = useState("");
    const [openCardForIndex, setOpenCardForIndex] = useState(null);



    useEffect(() => {
        if (!Array.isArray(students)) {
            setStudents([]);
            return;
        }
        const cleaned = students.filter((s) => s && typeof s === "object");
        if (cleaned.length !== students.length) setStudents(cleaned);
    }, [students, setStudents]);


    const handleDelete = (originalIndex) => {
        const next = students.filter((_, i) => i !== originalIndex);
        setStudents(next);

        if (openCardForIndex === originalIndex) {
            setOpenCardForIndex(null);
        }


    };
    console.log(students);


    const q = (searchTerm ?? '').trim().toLowerCase();
    const filtered = (Array.isArray(students) ? students : [])
        .filter(s => s && typeof s === 'object')
        .filter(s => q ? (String(s?.name ?? '').toLowerCase().includes(q)) : true);

    const toggleShowCard = (originalIndex) => {
        setOpenCardForIndex((prev) => (prev === originalIndex ? null : originalIndex));
    };


    const getOriginalIndex = (student) =>
        (Array.isArray(students) ? students : []).findIndex(s => s === student);


    return (
        <>
            <div className="display-student">
                <h3>Students Information:</h3>
                <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder="Search by name…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: 6, width: 200 }}
                        aria-label="Search by name"
                    />
                    {searchTerm && (
                        <button type="button" onClick={() => setSearchTerm("")}>Clear</button>
                    )}
                    <button onClick={refresh}>Refresh</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Roll No</th>
                            <th>Enrolled On</th>
                            <th>Action</th>
                            <th>StudentCard</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center" }}>
                                    {students.length === 0
                                        ? "No students yet"
                                        : `No matches for "${searchTerm}"`}
                                </td>
                            </tr>
                            ) : (
                            filtered.map((student) => {
                                const originalIndex = getOriginalIndex(student);
                                return(
                                    <React.Fragment key={student.rollNo ?? originalIndex}>
                                        <tr>

                                            <td>{student?.name ?? ""}</td>
                                            <td>{student?.dob ?? ""}</td>
                                            <td>{student?.age ?? ""}</td>
                                            <td>{student?.rollNo ?? ""}</td>
                                            <td>{student?.enrolledOn ?? ""}</td>
                                            <td>
                                                <button onClick={() => handleDelete(originalIndex)}>Delete</button>
                                            </td>
                                            <td>
                                                <button onClick={() => toggleShowCard(originalIndex)}>
                                                    {openCardForIndex === originalIndex ? "Hide" : "Show"}
                                                </button>
                                            </td>
                                        </tr>
                                        {openCardForIndex === originalIndex && (
                                            <tr>
                                                <td colSpan={7}>
                                                    <Card style={{ maxWidth: 320, margin: "8px auto" }}>
                                                        {/* Optional image; remove variant if not using holder.js */}
                                                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                                        <Card.Body>
                                                            <Card.Title>{student.name}</Card.Title>
                                                            <Card.Text>
                                                                Student overview with key details:
                                                            </Card.Text>
                                                        </Card.Body>
                                                        <ListGroup className="list-group-flush">
                                                            <ListGroup.Item>Roll No: {student.rollNo}</ListGroup.Item>
                                                            <ListGroup.Item>Age: {student.age}</ListGroup.Item>
                                                            <ListGroup.Item>DOB: {student.dob}</ListGroup.Item>
                                                            <ListGroup.Item>
                                                                Enrolled On: {student.enrolledOn}
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Card>
                                                </td>
                                            </tr>
                                        )}
                                        </React.Fragment>
                                );
                            }))
                        }
                    </tbody>
                </table>
                <p>Total number of students: {students.length}</p>
            </div >
        </>
    );
}


export default StudentList;