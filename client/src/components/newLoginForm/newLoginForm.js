
import React, { Component } from "react";
import "./newLoginForm.css";
import SubmitButton from "../submitButton"
import API from "../../utils/API"
import styles from "./newLoginForm.css"


class Newloginform extends Component {
  // Setting the component's initial state
  state = {
    username: "",
    password: "",
    email:""
  };
  

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
   event.preventDefault();

   let userLoginInfo={
     username:this.state.username,
     password:this.state.password
   }

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Course Instructor ${this.state.name} \n  has the following email ${this.state.email}  \n and phone number ${this.state.phone} `);

    console.log(userLoginInfo)
    API.submitUserLogin(userLoginInfo)

    //clear the state
};
  render() {
  
        return (
            <div>

                {/* <div id="modal1" class="modal">
                    <div class="modal-content">
                        <div className="input-field">
                            <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                            <label className="active" htmlFor="last_name">Username</label>
                        </div>

                        <div className="input-field">
                            <input onChange={this.handleInputChange} id="lastName" type="password" name="password" />
                            <label htmlFor="last_name">Password</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <SubmitButton class="modal-close waves-effect waves-green btn-flat" submitFunction={this.handleFormSubmit} />
                    </div>
                </div> */}

              <div className="container">

                <div className="row">
                  <div className="col s6 center-align">
                    <div className="card hoverable newloginclass z-depth-5">
                    <div className="card-content">
                    
                            <div className="input-field">
                                <i className="material-icons prefix">person</i>
                                <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                <label className="active" htmlFor="last_name">Username</label>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input onChange={this.handleInputChange} id="lastName" type="password" name="password" />
                                <label htmlFor="last_name">Password</label>
                            </div>

                            <SubmitButton submitFunction={this.handleFormSubmit} />
                        </div>
                      </div>
                    </div>
                </div>
              
              </div>
            </div>
        );
    }
}


export default Newloginform;