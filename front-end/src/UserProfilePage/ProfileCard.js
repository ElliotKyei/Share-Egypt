import SocialFollow from "./SocialFollow"
import "./UserProfile.css";

function ProfileCard() {
    return (
        <div class="wrapper">
        <div class="profile">
            <div class="profile_img_info">         
                <div class="img">
                    <img src="./Images/Avatar.png" alt="profile_pic"></img>     
                </div>
                <div class="info">
                    <p class="userName">userName</p>
                    
                </div>
            </div>



            <div class="profile_skills">
                <div class="skills">
                    <p>Contact Information</p>
                    <ul>
                        <li><span class="icon"><i class="fab fa-html5"></i></span>
                        <span class="contact">Name</span>
                    </li>
                        <li><span class="icon"><i class="fab fa-css3-alt"></i></span>
                        <span class="contact">Phone Number</span></li>
                        <li><span class="icon"><i class="fab fa-js-square"></i></span>
                        <span class="contact">Email</span></li>  
                    </ul>
                </div>
                <div class="tags_wrap">
                    <SocialFollow/>
                </div>
            </div>

        </div>
        <div class="profile_counts">
            <div class="profile_counts_wrap">
            <div class="item">
                <div class="icon"><i class="fas fa-thumbs-up"></i></div>
                <div class="titleBm">LOCATION</div>
            </div>
            </div>
            <div class="profile_counts_wrap">
            <div class="item">
                <div class="icon"><i class="fas fa-eye"></i></div>
            <div class="titleSub">City</div>
            </div>
            </div>
            <div class="profile_counts_wrap">
            <div class="item">
                <div class="icon"><i class="fas fa-comment"></i></div>
            <div class="titleEdt">Country</div>
            
            </div>
            </div>
        </div>
    </div>)
}

export default ProfileCard;
