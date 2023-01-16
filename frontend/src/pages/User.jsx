import React, { useState, useEffect  } from 'react';
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
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  useEffect(() => {
    profileUser();
    // eslint-disable-next-line
  }, []);

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
      .then((response) => {
        dispatch(userFirstName(response.body.firstName));
        dispatch(userLastName(response.body.lastName));
        setNewFirstName(response.body.firstName)
        setNewLastName(response.body.lastName)
      })
    } catch(err){
      window.location.href="http://localhost:3000/error500"
      console.log(err)
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
    console.log(response)
    if(response.status === 200){
      dispatch(userFirstName(response.body.firstName));
      dispatch(userLastName(response.body.lastName));
      window.location.reload();
      }else{
        alert("Impossible de modifier votre nom !")
      }
  }

  return (
  <div>
    <Header/>
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName} !</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" value={newFirstName} onChange={e =>  setNewFirstName(e.target.value)}/>
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" value={newLastName} onChange={e => setNewLastName(e.target.value)} />
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