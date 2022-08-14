/*==================================================
CampusView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
    const { campus, deleteCampus, deleteStudent } = props;

    // Render a single Campus view with list of its students
    return (
        <div>

            
          <h1>{campus.name}</h1> <hr/> <br/>

          <div>
                <Link to={`/campuses`}>
                    <button onClick={() => deleteCampus(campus.id)}>
                        Delete {campus.name}
                    </button>
                </Link> <br/>
                <Link to={`/editcampus/${campus.id}`}>
                    <button>Edit {campus.name}</button>
                </Link>
                <Link to={`/newstudent`}>
                <button>Add New Student</button> <br/>
            </Link>
          </div>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <hr/><h2> Students </h2>
          {campus.students.length === 0 ? <p> {campus.name} has no student.</p>: null}
          
          {campus.students.map((student) => {
                 return (
                    <div key={student.id}>
                      <Link to={`/student/${student.id}`}>
                        <h2>{student.firstname + " " + student.lastname}</h2>
                      </Link>             
                    </div>  
                );
            })}
        </div>
      );
    };
    

export default CampusView;
