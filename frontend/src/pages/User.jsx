import React, { useState, useEffect } from 'react';
import Footer from "../components/footer"
import Header from "../components/header"
import "../styles/main.css"
import { useDispatch } from 'react-redux';
import { userFirstName, userLastName} from "../store"
import { useSelector } from "react-redux"

export default function User() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token)
  const firstName = useSelector(state => state.firstName.firstName)
  const lastName = useSelector(state => state.lastName.lastName)
  const [values, setValues] = useState(firstName, lastName);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  useEffect(() => {
    profileUser();
    // eslint-disable-next-line
  }, []);

  function catchError( err ){
    console.log(err)
    window.location.href="http://localhost:3000/error401"
}

  async function profileUser() {
    let response;
    try { response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      }
    })
      .then(data => data.json())
      .then(response => {
        if(response.status === 401){
          catchError( response );
        } else {
          dispatch(userFirstName(response.body.firstName));
          dispatch(userLastName(response.body.lastName));
          setNewFirstName(response.body.firstName)
          setNewLastName(response.body.lastName)
        }
      
      })
    } catch(err){
      catchError();
    }
  return response;
  }

  async function updateUser(infos) {
    let response;
    try { response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token
      },
      body: JSON.stringify(infos)
    })
      .then(data => data.json())
   } catch(err){
    console.log(err)
   }
   return response;
  }

  const handleSubmit = async e => {
    e.preventDefault();
      const response = await updateUser({
        "firstName": newFirstName,
        "lastName": newLastName
      });
      if(response.status === 200 && (response.body.firstName === "" || response.body.lastName === "")){
        alert("Impossible to modify your name!")
        }else if (response.status === 200 && response.body.firstName !== null && response.body.lastName !== null){
          console.log(response.body.firstName)
          console.log(response.body.lastName)
          dispatch(userFirstName(response.body.firstName));
          dispatch(userLastName(response.body.lastName));
          window.location.reload();
        }else {
          alert("Impossible to modify your name!")
        }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setNewFirstName(values.firstName)
    setNewLastName(values.lastName)
  }, [values]);

  return (
  <div>
    <Header/>
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName} !</h1>
        
        <form onSubmit={handleSubmit}>
          <div className='displayInput'>
            <div className="input-wrapper">
              <label htmlFor="firstname">First Name</label>
              <input type="text" name='firstName' id="firstname" placeholder={firstName} onChange={handleChange}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name='lastName' id="lastname" placeholder={lastName} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="edit-button">Save</button>
          <button type="reset" className="edit-button">Cancel</button>
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