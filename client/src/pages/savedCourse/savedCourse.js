import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import Header from "../../components/h1withDivider";
import Send from "../../components/sendAttendance/sendAttendance2"
import booksImg from "../../images/books1.jpg";
import * as date from '../../utils/dateReaders';
const $ = window.$;


class Course extends Component {
    state={
        course:{
            instructors:[],
            attendanceRecords:[],
            students:[]
        },
        instructorsToAdd:[],
        studentsToAdd:[],
        hasBeenSent:false
    }
  
    constructor(props){
        super(props);
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
    }

    updateCourseStudents=(newStudents)=>{
        let newState = this.state.course
        newState.students=newStudents
        this.setState((prev)=>({
            course:newState
        }))
    }
    updateCourseInstructors=(newInstructors)=>{
        let newState = this.state.course
        newState.instructors=newInstructors
        this.setState((prev)=>({
            course:newState
        }))
    }

    getSelectedInstructors=(selected)=>{
        let instructorsSelected =[]
        selected.forEach((element,i) => {
            instructorsSelected.push(element.value)
        });
        this.setState({
            instructorsToAdd:instructorsSelected
        })
    }

    getSelectedStudents=(selected)=>{
        let studentsSelected =[]
        selected.forEach((element,i) => {
            studentsSelected.push(element.value)
        });
        this.setState({
            studentsToAdd:studentsSelected
        })
    }
    componentDidMount=()=>{
        $('.modal').modal();
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip();
        $('ul.tabs').tabs({
            // 'swipeable': true,
            // 'responsiveThreshold' : Infinity
        });
    }

    render(){
        return(
            <PageContainer>
                <Header align='center' text={this.state.course.name}/>
                <div className="row" id="courseCard"> 
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                <img src={booksImg} alt="books" /> 
                            </div>
                            <div id="registerStudent" className="modal">
                                <h4 id="modalHeader">Register Students</h4>
                                <Register  updateCourseInstructors={this.updateCourseInstructors} updateCourseStudents={this.updateCourseStudents} courseId={this.state.course._id} />            
                            </div>                            
                            <ul id="tabs-swipe" className="tabs">
                                <li className="tab col s4"><a className="active" href="#courseContent">Course Details</a></li>
                                <li className="tab col s4"><a  href="#classRoster">Class Roster</a></li>
                                <li className="tab col s4"><a href="#test-swipe-3">Attendance</a></li>
                            </ul>

                            {/* Course Content & Student Roster in Tabs */}
                            <div id="courseContent" className="col s12 grey lighten-3 tabContent">               
                                {/* <h4 className='bold m-top'>{this.state.course.name}</h4>   */}
                                <h4 className='bold m-top'>Details</h4>
                                <p><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                <p><b>Start Date:</b> {this.state.course.startDate? date.readDate(this.state.course.startDate) : this.state.course.startDate}</p>
                                <p><b>End Date:</b> {this.state.course.startDate? date.readDate(this.state.course.endDate) : this.state.course.endDate}</p>
                                <p><b>Start Time:</b> {this.state.course.startTime}</p>
                                <p><b>End Time:</b> {this.state.course.endTime}</p>
                                <p className='bottom'><b>Location:</b> {this.state.course.location}</p>
                            </div> 

                            <div id="classRoster" className="col s12 grey lighten-3 tabContent center-align courseTab">
                            {this.state.course.students.length>0 || this.state.course.instructors.length>0?
                                <div>
                                    <h4 className='bold m-top'>Roster</h4>
                                    
                                    <p className='flow-text rosterHeader'>{this.state.course.instructors.length>0? 'Instructors':''}</p>
                                    <ul>
                                        {this.state.course.instructors.map((current,i)=>{
                                            return(
                                                <li key={i}className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                            )
                                        })}
                                    </ul>
                                    
                                    <p className='flow-text rosterHeader'>{this.state.course.students.length>0? 'Students':''}</p>
                                    <ul className='bottom'>
                                        {this.state.course.students.map((current,i)=>{
                                            return(
                                                <li key={i} className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            :
                                <h4>Nobody Here Yet</h4>        
                            }
                                
                            </div>

                            <div id="test-swipe-3" className="col s12 grey lighten-3 tabContent courseTab">

                                <h4 className='bold m-top'>Records</h4>
                                <ul className='collapsible'>
                                    {this.state.course.attendanceRecords.map((current,i)=>{
                                        return(
                                                <li  key={i}>
                                                    <div className='collapsible-header flow-text'>{date.readDate(current.date)}</div>
                                                    <div className='collapsible-body'>
                                                        {current.students.map((current,i)=>{
                                                            return(
                                                                <div  key={i} className='row'>
                                                                    <div className='col s6 right-align'>
                                                                        <p className='stuAttName'>{`${current.student.firstName} ${current.student.lastName}`}</p>
                                                                    </div>
                                                                    <div className='col s6 vertical-align'>
                                                                        <p>{current.inAttendance? <i className='material-icons check small'>check</i>:<i className='material-icons clear'>clear</i>}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </li>
                                        )
                                    })}
                                </ul>

                                {this.state.course.students.length>0 && this.state.course.instructors.length>0?
                                    <div className='bottom'>
                                        <p className='sendToText flow-text'>Send To Instructor</p>                            
                                        <Send attendLink={`https://gentle-garden-19053.herokuapp.com/attendance/temp362019/${this.props.token}/${this.state.course._id}`} clickFunction={this.sendAttendanceForm}instructors={this.state.course.instructors}/>
                                        <a href={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`} target="_blank">Attendance Form</a>
                                    </div>
                                :
                                    <div className='bottom'></div>
                                }
                            </div>
                        
                        </div>
                        
                        {/* Register Student/ Add Instructor Button */}
                        <a id='LightBlue'className="btn modal-trigger tooltipped btn-large btn-floating halfway-fab waves-effect waves-light" href="#registerStudent" data-target="registerStudent" data-position="right" data-tooltip="Add Student &amp; Instructors"><i className="material-icons">add</i></a>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course