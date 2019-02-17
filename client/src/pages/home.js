import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API";

class Home extends Component{
    state={
        allCourses:[],
        students:[]
    }

    componentDidMount(){
        this.getCourses();
        this.getAllStudents();
    }
    getAllStudents=()=>{
        API.getAllStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }
    getCourses=()=>{
        API.getAllCourses()
            .then(res => this.setState({allCourses:res.data}))
            .catch(err => console.log(err));
    }

    addStudentToCourse=(studentIdsToAdd,courseId)=>{
        alert(courseId)
        API.addStuToCourse(studentIdsToAdd,courseId)
            .then(res=>console.log(res))
            .catch(err => console.log(err));
    }
   
   render(){
        return(
            <Pagecontainer>
                <h1>Hi Team!</h1>
                <h2>Number of Courses:{this.state.allCourses.length}</h2>
                <h3>All Courses:</h3>
                <ul className="collection">
                    {
                        this.state.allCourses.map((current,i)=>{
                            return(
                                <li onClick={()=>this.addStudentToCourse(this.state.students,current._id)} key={i} className="collection-item">{JSON.stringify(current)}</li>
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
   }

}

export default Home;