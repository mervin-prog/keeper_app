import React, { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';


const Profile = () => {

    const [isOpen , setIsOpen] = useState(false);

    const {user, logout} = useAuthStore();

    const toggleMenu = () =>{
        setIsOpen(!isOpen);
    }

    const handleLogout = (e) =>{
        e.preventDefault();
        logout();
    }

    return (
        <div id="hamburger-nav">
            <div className="hamburger-menu">
                <div 
                className={`hamburger-icon ${isOpen ? 'open' : ''}`}  
                onClick={toggleMenu}
                >
                <span></span>
                <span></span>
                <span></span>
                </div>
                <div className={`menu-links ${isOpen ? 'open' : ''}`}>
                   
                    <AccountCircleOutlinedIcon style={{fontSize:"50px"}}/>
                    <br />
                    <h3 style={{color:"#f5ba13", letterSpacing:"1px"}}>Profile Info</h3>
                    <br />
                    <li>Name : <span>{user.name}</span></li>
                    <li>Email : <span>{user.email}</span></li>
                    <hr />
                    <h3 style={{color:"#f5ba13", letterSpacing:"1px"}}>Account Activity</h3>
                    <br />
                    <li>Joined : <span>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
					})}
                    </span></li>
                    <li>Last Login : <span>{formatDate(user.lastLogin)}</span></li>

                    <div className="hamburger-btn">
                    <button onClick={handleLogout}><span>Log out</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
