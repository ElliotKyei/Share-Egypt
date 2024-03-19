import React from 'react';
import './RegisterPage.css'

function RegisterPage() {

    return (

        <div>
                    <div className='row'>
                        <section className='hero-full' id='hero-3-left'>
                            <div className='hero-content-full' id='hero-content-3-left'>
                            <a className='user-btn' href="/registerUser">Sign up for a <strong>user</strong> account</a>
                            </div>
                        </section>
                        <section className='hero-full' id='hero-3-right'>
                            <div className='hero-content-full' id='hero-content-3-right'>
                            <a className='charity-btn' href="/registerCharity">Sign up for a <strong>charity</strong> account</a>
                            </div>
                        </section>
                    </div>
        </div>
    );
}

export default RegisterPage;
