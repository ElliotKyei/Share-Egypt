import './UserProfile.css';
import './ProfileCard.css';
import Header from './Header';
import ProfileCard from './ProfileCard';
import React from 'react';


function UserProfilePage(props) {
    return( <div className="App">
    <Header />
    <ProfileCard/>
</div>);
}

export default UserProfilePage;
