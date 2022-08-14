/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
    const { student, deleteStudent } = props;

    // Render a single Student view
    return (
        <div>
            <h1>{student?.firstname + " " + student?.lastname}</h1><hr/>
            <img src={student.imageUrl} width="250px" alt="student image" />
            <p>Id: {student.id}</p>
            
            {student.campus === null ? <p> This student has no campus.</p> : 
            <Link to={`/campus/${student.campus.id}`}>
                <h3>Enrolled at {student.campus.name}</h3>
            </Link>
            }

            <Link to={`/students`}>
                <button onClick={() => deleteStudent(student.id)}>
                    Delete Student
                </button>
            </Link>
            {<Link to={`/editstudent/${student.id}`}><button>Edit Student
        </button></Link>}
        </div>
    );
};

export default StudentView;
