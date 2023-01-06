import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/footer"
import "../styles/main.css"
import imgBandeau from "../assets/argentBankLogo.png"

async function loginUser(infos) {
  return fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(infos)
  })
    .then(data => data.json())
 }

export default function Signin() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      "email": userEmail,
      "password": password
   });

   try{
      if(response.status === 200){
        localStorage.setItem("token", JSON.stringify(response.body))
        window.location.href = "/profile";
        }else{
          alert("Nom d'utilisateur ou mot de passe incorect !")
        }
      } catch(err) {
        console.log(err)
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
                <input type="text" id="username" value={userEmail} onChange={e => setUserEmail(e.target.value)}/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
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