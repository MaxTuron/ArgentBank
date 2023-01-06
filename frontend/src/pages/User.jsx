import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from "../components/footer"
import imgBandeau from "../assets/argentBankLogo.png"
import "../styles/main.css"

async function profileUser(infos) {
  return fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + JSON.parse(localStorage.getItem('token')).token
    },
    body: JSON.stringify(infos)
  })
    .then(data => data.json())
 }


export default function User() {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function getResult(){
    let response = await profileUser();
    try{
      if(response.status === 200){
        setUserEmail(response.body.email);
        setFirstName(response.body.firstName);
        setLastName(response.body.lastName)
        }else{
          alert("Impossible de récupérer les données !")
        }
      } catch(err) {
        console.log(err)
      }
  }

  getResult();

  return (
  <div>
    <nav className="main-nav">
        <Link  to="/">        
            <img className="main-nav-logo-image" src={imgBandeau} alt="Argent Bank Logo" />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
      <div>
        <a className="main-nav-item" href="./user.html">
          <i className="fa fa-user-circle"></i>
          {firstName}
        </a>
        <a className="main-nav-item" href="./index.html">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </a>
      </div>
    </nav>
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName} !</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
    <Footer/>
  </div>
    
  );
}