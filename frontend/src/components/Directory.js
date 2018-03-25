import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSelectedEmployee } from '../actions'
import Employee from './Employee'

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedEmployee: employee => { 
      dispatch( setSelectedEmployee(employee));
    }
  }
}

class Directory extends React.Component {

  constructor() {
    super();

    this.state = {
      inputName: ''
    };
  }

  handleTextChange = (evt) => {
    this.setState({
      inputName: evt.target.value
    });
  }

  handleClickUser = (user) => {
    this.props.setSelectedEmployee(user);
    this.props.history.push('/reception/reason');
  }

  render() {

    const users = 
      this.state.inputName.length < 2 ?
      [] :
      (this.props.users.filter(
        u => u.name.toLowerCase()
                   .includes(this.state.inputName.toLowerCase())
      ));

    return (
      <div >
        <div className="container">
          <h3 className="mb-3" >Who are you looking for?</h3>
          <div className="row">
            <div className="col-6">
              <input type="text" 
                     ref="name"
                     className="form-control form-control-lg" 
                     placeholder="Name" 
                     onChange={this.handleTextChange}
                     autoFocus
              />
            {
              users.length === 0 ? 
                <p className="text-secondary mt-1 pl-3" >
                  Enter 2 more letters of the employee's name
                </p> : ""
            }
            </div>
          </div>
          <div className="row mt-3">
          {
            users.map((user, i) => (
              <div className="col-sm-4" key={i}>
                <Employee employee={user}  
                          onClick={()=>{this.handleClickUser(user)}} />
              </div>
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Directory));
