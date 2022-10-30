import React, { useState } from "react"
import axios from 'axios'
import Cookies from 'universal-cookie'


const baseUrl = 'http://localhost:8000/';
const cookies = new Cookies();

// eslint-disable-next-line import/no-anonymous-default-export
export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  props={
    form:{
        email:"",
        password:""
    }
}

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  let handleChange = async e => {
        await props.setState({
            form:{
                ...props.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(props)
    }
    
    const logIn= async ()=>{
        console.log("Login")
        await axios.get(baseUrl, {params: {email: props.form.email, password: props.form.password}})
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

  if (authMode === "signin") {
    return (
      <div className="mainContainer">
        <div className='myImage'>
                <img
                alt=""
                src="../logo.png"
                width="100"
                height="100"
                className="d-inline-block align-top"
                />{' '}
        </div>
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={()=>logIn()}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
      </div>
    )
  }

  return (
    <div className="mainContainer">
        <div className='myImage'>
                <img
                alt=""
                src="../logo.png"
                width="100"
                height="100"
                className="d-inline-block align-top"
                />{' '}
        </div>
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Position</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Position"
            />
          </div>
          <div className="form-group mt-3">
            <label>Skills</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Skills"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
    </div>
  )
}