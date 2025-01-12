import { Link } from "react-router-dom";
import imgBandeau from "../assets/argentBankLogo.png"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import {userLogout } from "../store"
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userLogged = useSelector(state => state.isLoggedIn.isLoggedIn);
    let userName = useSelector(state => state.firstName.firstName);
    function logOut(){
      dispatch(userLogout())
      navigate('/');
    }

    return (
        <nav className="main-nav">
        <Link  to="/">        
                <img className="main-nav-logo-image" src={imgBandeau} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
          <div>
          
            {userLogged ? 
            <div>
              <Link  to="/profile"><i className="fa fa-user-circle"></i>{userName}</Link>&nbsp;&nbsp; 
              <Link  to="/" onClick={logOut}><i className="fa fa-sign-out"></i>Sign Out </Link>
            </div>
                 : <Link  to="/signin"> Sign In <i className="fa fa-user-circle"></i></Link>
            }  
          </div>
        </nav>
    );
  }