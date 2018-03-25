import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { setSelectedReason } from '../actions'
import Employee from './Employee';

const mapStateToProps = state => {
  return {
    selectedEmployee: state.selectedEmployee,
    reasons: state.reasons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedReason: reason => { 
      dispatch( setSelectedReason(reason));
    }
  }
}

class Reason extends React.Component {

  handleClick = (reason) => {
    this.props.setSelectedReason(reason);
    
    if (reason.need_visitor) {
      this.props.history.push('/reception/visitor');
    }
    else {
      this.props.history.push('/reception/result');
    }
  }

  render() {

    if (!this.props.selectedEmployee) {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <Employee employee={this.props.selectedEmployee} />
          </div>
        </div>
        <h3 className="my-3" >What brings you here?</h3>
        <div className="row">
          <div className="col-sm-4">
            {
              this.props.reasons.map(
                (reason, i) => (
                  <ReasonItem reason={reason} 
                              key={i} 
                              onClick={() => { this.handleClick(reason)}} />
                )
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

const ReasonItem = (props) => {
  return (
    <div className="card card-body mb-3 div-shadow" onClick={props.onClick}>
      <h4 className="m-0" ><strong>{props.reason.message}</strong></h4>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reason));
