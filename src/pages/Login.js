import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Login.css'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
const baseUrl = 'http://localhost:8000/';
const cookies = new Cookies();
const navigate = useNavigate

const loggingIn = (e) => {
    navigate('/home',
        {
            state: {
                user_id: e.id,
                user_name: e.name,
                user_email: e.email,
                user_position: e.position,
                user_skills: e.skills
            }
        });
}



class Login extends Component {
    state={
        form:{
            email:"",
            password:""
        }
    }

    handleChange= async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }


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
        .then(response =>{
            
                
        })
        .catch(error=>{
            console.log(error);
        })
    }
  render() {
    return (
        <div className='mainContainer'>
            <div className='secondContainer'>
                <div className='fromGroup'>
                    <label>
                        Email:
                    </label>
                    <br/>
                    <input
                        type="text"
                        className="form-control"
                        name='email'
                        onChange={this.handleChange}
                    />
                    <br/>
                    <label>Password:</label>
                    <br/>
                    <input
                        type="password"
                        className='form-control'
                        name='password'
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