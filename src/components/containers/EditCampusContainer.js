/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';
import { EditCampusView } from '../views';

class EditCampusContainer extends Component {
      constructor(props){
      super(props);
      this.state = {
        id: null,
        name: "", 
        imageUrl: "",
        address: "",
        description: null,
        redirect: false, 
        redirectId: null,
      };
  }
  componentDidMount() {
    this.props.fetchCampus(window.location.pathname.slice(-1));
    this.setState({
      name: this.props.campus.name,
      imageUrl:this.props.campus.imageUrl,
      address: this.props.campus.address,
      description: this.props.campus.description,
      redirect: false, 
      redirectId: null,
      id: this.props.campus.id
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
      event.preventDefault();  
      let updateCampus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.image,
            id: window.location.pathname.slice(-1)
        };

      await this.props.editCampus(updateCampus);

      this.setState({
        id: "",
        name:"",
        imageUrl: "",
        address: null,
        description: null,
        redirect: true, 
        redirectId: window.location.pathname.slice(-1)
      });
        
    };
  componentWillUnmount() { 
    this.setState({redirect: false, redirectId: null});
}   
    render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }


    return (
      <div>
        <Header />
        <EditCampusView 
        fetchCampus={this.props.fetchCampus}
        editCampus={this.props.editCampus}  
        campus={this.props.campus} 
        handleChange = {this.handleChange} 
        handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}
// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus};
};
// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
      fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
      editCampus:  (campus) => dispatch(editCampusThunk(campus)),
    })
}
export default connect(mapState, mapDispatch)(EditCampusContainer);