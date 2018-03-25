import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { setVisitor } from '../actions';
import Employee from './Employee';

const mapStateToProps = state => {
  return {
    selectedEmployee: state.selectedEmployee,
    selectedReason: state.selectedReason,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setVisitor: visitor => { 
      dispatch( setVisitor(visitor) )
    },
  }
}

class Visitor extends React.Component {

  constructor() {
    super();

    this.state = {
      inputName: ''
    }
  }

  handleSumbit = (evt) => {
    evt.preventDefault();

    this.props.setVisitor({name: this.state.inputName});
    this.props.history.push('/reception/result');
  }

  handleTextChange = (evt) => {
    this.setState({
      inputName: evt.target.value
    })
  }

  render() {

    if (!this.props.selectedEmployee || !this.props.selectedReason) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div >
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Employee employee={this.props.selectedEmployee} />
            </div>
          </div>
          <h3 className="my-3" >What is your name?</h3>
          <form onSubmit={this.handleSumbit} >
            <div className="row no-gutters">
              <div className="col-6">
                <input type="text" 
                      name="inputName"
                      className="form-control form-control-lg" 
                      placeholder="Name" 
                      onChange={this.handleTextChange}
                      autoFocus
                />
              </div>
              <div className="col-6">
                <input type="submit" className="btn btn-primary btn-lg ml-2" 
                            style={{width:"7em", backgroundColor:"#008aff"}}
                            value="Enter"
                            disabled={ this.state.inputName.length < 2 }                            
                />
              </div>
            </div>
          </form>
        </div>
      </div>

    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visitor));
