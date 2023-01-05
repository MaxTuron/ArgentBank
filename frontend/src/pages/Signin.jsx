import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/footer"
import "../styles/main.css"
import imgBandeau from "../assets/argentBankLogo.png"

async function loginUser(credentials) {
  return fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Signin() {
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      userEmail,
      password
    });
    console.log(response)
    if ('accessToken' in response) {
      alert("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['accessToken']);
        localStorage.setItem('user', JSON.stringify(response['user']));
        window.location.href = "/profile";
      });
    } else {
      alert("Failed", response.message, "error");
    }
  }

  return (
      <div>
        <nav className="main-nav"> 
            <Link  to="/">        
                <img className="main-nav-logo-image" src={imgBandeau} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
            <Link  to="/signin">
                Sign In
                <i className="fa fa-user-circle"></i>
            </Link>
            </div>
        </nav>
        <main className="main bg-dark">
          <section className="sign-in-content">          
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" onChange={e => setUserEmail(e.target.value)}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type="submit" className="sign-in-button">Sign In</button> 
              
            </form>
          </section>
        </main>
        <Footer/>
      </div>
  );
}