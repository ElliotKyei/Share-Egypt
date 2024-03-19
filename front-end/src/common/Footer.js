import React from 'react';
import './Footer.css'

function Footer() {

        // this hook will be for displaying ShareEgypt statistics when the API is up

    // const [metadata, setMetadata] = useState(null);
    // useEffect(async () => {
    //     setMetadata(await api.getMetadata());
    // }, [])


    return(
        <div>

            <section className="footer">
                
                <div className='footer-title'>
                    <h1>ShareEgypt</h1>
                </div>

                <div className='footer-navigate'>
                    <h2><strong>Navigate</strong></h2>
                    <div style={{'display':'inline-block'}}>
                        <ul>
                            <li>Charity Listing</li>
                            <li>About</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                    <div style={{'float':'right'}}>
                        <ul>
                            <li>Find a charity</li>
                            <li>Register a user account</li>
                            <li>Register a charity account</li>
                        </ul>
                    </div>
                </div>
  
                <div className='footer-socials'>
                    <h2><strong>Keep in touch with us</strong></h2>
                    <div>
                        <ul>
                            <li>shareegypt@gmail.com</li>
                            <li>XXX-XXX-XXXX</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Footer;