/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editStudentThunk } from '../../store/thunks';
import { EditStudentView } from '../views';
import { fetchStudentThunk } from "../../store/thunks";


class EditStudentContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          email: "",
          imageUrl: "",
          gpa: null,
          campusId: null,
          redirect: false,
          redirectID: null 
        };

    }
    componentDidMount() {
      this.props.fetchStudent(window.location.pathname.slice(-1));
          this.setState({
            firstname: this.props.student.firstname,
            lastname: this.props.student.lastname,
            email: this.props.student.email,
            imageUrl: this.props.student.imageUrl,
            gpa: this.props.student.gpa,
            campusId: this.props.student.campusId,
            redirect: false, 
            redirectId: null
          })
        }
  
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

    handleSubmit = async event => {
        event.preventDefault();  
    
     
        let updateStudent = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          imageUrl: this.state.imageUrl,
          gpa: this.state.gpa,
          campusId: this.state.campusId,
          id: window.location.pathname.slice(-1)
      };
         await this.props.editStudent(updateStudent);
        this.setState({
            firstname: "", 
            lastname: "", 
            email: "",
            imageUrl: "",
            gpa: 0,
            campusId: null, 
            redirect: true, 
            redirectId: window.location.pathname.slice(-1)
          });
        
      };
  componentWillUnmount() { 
    this.setState({redirect: false, redirectId: null});
}   
    render() {
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <EditStudentView 
          fetchStudent={this.props.fetchStudent}
          editStudent={this.props.editStudent}
          student={this.props.student} 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}
// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "Student".
const mapState = (state) => {
  return {
    student: state.student};
};
// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
      fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
      editStudent:  (student) => dispatch(editStudentThunk(student)),
    })
}
export default connect(mapState, mapDispatch)(EditStudentContainer);