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

 async function updateUser(infos) {
  return fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + JSON.parse(localStorage.getItem('token')).token
    },
    body: JSON.stringify(infos)
  })
    .then(data => data.json())
 }

async function emptyStorage() {
  localStorage.clear();
 }

export default function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [actualFirstName, setactualFirstName] = useState("");
  const [actualLastName, setactualLastName] = useState("");

  async function getResult(){
    let response = await profileUser();
    try{
      if(response.status === 200){
        setFirstName(response.body.firstName);
        setLastName(response.body.lastName)
        setactualFirstName(response.body.firstName);
        setactualLastName(response.body.lastName)
        }else{
          alert("Impossible de récupérer les données !")
        }
      } catch(err) {
        console.log(err)
      }
  }

  window.onload = function() {
    getResult();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await updateUser({
      "firstName": firstName,
      "lastName": lastName
   });

   try{
    if(response.status === 200){
      window.location.reload();
      }else{
        alert("Impossible de modifier votre nom !")
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
        <a className="main-nav-item" href="./user.html">
          <i className="fa fa-user-circle"></i>
          {actualFirstName}
        </a>
        <Link  to="/" onClick={emptyStorage}> 
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
    </nav>
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{actualFirstName} {actualLastName} !</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>

          <button type="submit" className="edit-button">Edit Name</button>

        </form>  
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