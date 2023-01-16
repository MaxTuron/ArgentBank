import React, { useState } from 'react';
import Footer from "../components/footer"
import "../styles/main.css"
import Header from "../components/header"
import { loginUser}  from "../utils/fetchData"
import { useDispatch } from 'react-redux';
import {isLoggedIn, userToken } from "../store"
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      "email": userEmail,
      "password": password
   });
    if(response.status === 200){
      dispatch(isLoggedIn());
      dispatch(userToken(response.body.token));
      }else{
        alert("Nom d'utilisateur ou mot de passe incorect !")
      }
      navigate("/profile")
  }

  return (
      <div>
        <Header/>
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