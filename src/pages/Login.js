import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Login.css'
import axios from 'axios'
import Cookies from 'universal-cookie'

//------------------------------------------
// Cons
//------------------------------------------

const baseUrl = 'http://localhost:8000/';
const cookies = new Cookies();

//------------------------------------------
// Login Class
//------------------------------------------
class Login extends Component {
    state={
        form:{
            email:"",
            password:""
        }
    }
    
    handleChange = async e => {
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    
    // Method to send login information to the backend
    logIn= async ()=>{
        await axios.get(baseUrl, {params: {email: this.state.form.email, password: this.state.form.password}})
        .then(response => {
            console.log(response.data)
            cookies.set('id', response.data.id, {path:"/"})
            cookies.set('name', response.data.name, {path:"/"})
            cookies.set('email', response.data.email, {path:"/"})
            cookies.set('position', response.data.position, {path:"/"})
            cookies.set('skills', response.data.skills, {path:"/"})
            alert(`Hello ${response.data.name}, nice to see you!`)
            window.location.href="./home"
        })
        .catch(error=>{
            console.log(error);
            if(error.message === "Request failed with status code 512"){
                alert("Missing email or password, please fill the form")
            } else if((error.message === "Request failed with status code 404")){
                alert("The email or password is not correct, please try again")
            }
                   
        })
    }


    // It renders the objects in the body of the page
  render() {
    return (
        <div className='mainContainer'>
            <div className='myImage'>
                <img
                alt=""
                src="../logo.png"
                width="100"
                height="100"
                className="d-inline-block align-top"
                />{' '}
            </div>
            <div className='secondContainer'>
                <div className='fromGroup'>
                    <label>
                        Email:
                    </label>
                    <br/>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input
                        type="password"
                        className='form-control'
                        name='password'
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    <br/>
                    <button className='btn btn-primary'
                    onClick={()=>this.logIn()}>Log In</button>

                </div>
            </div>
        </div>

    )
  }
}

export default Login;