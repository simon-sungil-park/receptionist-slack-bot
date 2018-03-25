import React from 'react';

const Employee = function(props) {
  return (
    <div className="card mb-2 div-shadow" onClick={props.onClick} >
      <div className="row no-gutters h-100">
        <div className="col-2">
          <img className="w-100" 
               src={props.employee.image_url} 
              alt={props.employee.name} />
        </div>
        <div className="col-10 my-auto">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="my-0 ml-3">
              <strong>{props.employee.name}</strong>
            </h5>
            {
              props.numberOfNotification ? 
                (<span className="badge badge-secondary badge-pill mr-3">
                  {props.numberOfNotification}
                </span>) :
                ''
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employee;
