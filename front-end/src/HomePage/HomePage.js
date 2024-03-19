import React from 'react';
import './HomePage.css';
import Footer from '../common/Footer'
import CharityIcon from '../Images/Charity_Icon.png'
import BlogIcon from '../Images/Blog_Icon.png'
import ReviewIcon from '../Images/Review_Icon.png'
function HomePage() {

    return (
        <div>
            <div className='pageContainer'>
                <div className='row'>
                    <section className='hero-full' id='hero-1'>
                        <div className='hero-content-full' id='hero-content-1'>
                            <h1>Be a part of something bigger.</h1>
                            <h2>ShareEgypt</h2>
                            <a className='btn' href="/charities">Browse our charity listing</a>
                        </div>
                    </section>
                </div>

                <div className='row'>
                    <section className='hero-full' id='hero-2'>
                        <div className='hero-content-full' id='hero-content-2'>
                            <h3 id='hero-content-2-h3' style={{ 'color': 'white', 'font-size': '2em' }}>What we do</h3>
                            <p id='hero-content-2-p'>Today, Egyptian charities are struggling to find efficient ways to interact with their communities and maintain an environment where they can form close relationships
                                with their donors, reinforce trust within the charity, and share their accomplishments. <strong>ShareEgypt</strong> is a nonprofit organization that seeks to provide
                                Egyptian Charities a platform where compassionate individuals can support and stay in touch with thousands of charities all across Egypt through blog post, bookmarking</p>
                        </div>
                    </section>
                    <section className='hero-full' id='hero-2-right'>
                    </section>
                </div>

                <div className='row' style={{ 'padding-top': '2em', 'padding-bottom': '8em', 'margin-top': '-8em' }}>

                    <div className='title' id='Summary'>
                        <h3>How ShareEgypt provides a platform for local Egpytian Charities</h3>
                    </div>

                    <div className='details' style={{ 'color': 'black' }}>

                        <section className='detail-section'>
                            <div className='detail-icon' style={{ 'float': 'left' }}>
                                <img src={CharityIcon} alt='Charity Icon' style={{ 'width': '120px', 'height': 'auto' }} />
                            </div>

                            <div className='detail-desc'>
                                <p>ShareEgypt enables Egyptian charities to register their charity,
                                    and go through a screening process to ensure the charity is legitimate</p>
                            </div>
                        </section>

                        <section className='detail-section'>
                            <div className='detail-icon' style={{ 'float': 'left' }}>
                                <img src={BlogIcon} alt='Charity Icon' style={{ 'width': '120px', 'height': 'auto' }} />
                            </div>

                            <div className='detail-desc'>
                                <p>ShareEgypt provides charities the tools to interact with communities through blog posts and a comment section available to registered users</p>
                            </div>
                        </section>

                        <div className="break"></div>

                        <section className='detail-section'>
                            <div className='detail-icon' style={{ 'float': 'left' }}>
                                <img src={ReviewIcon} alt='Charity Icon' style={{ 'width': '120px', 'height': 'auto' }} />
                            </div>

                            <div className='detail-desc'>
                                <p>Keep all the charities you support in one place within your bookmarks and write about your journey with a charity by writing
                                    a review on their page</p>
                            </div>
                        </section>

                        <section className='detail-section'>
                            <div className='detail-icon' style={{ 'float': 'left' }}>
                                <img src={CharityIcon} alt='Charity Icon' style={{ 'width': '120px', 'height': 'auto' }} />
                            </div>

                            <div className='detail-desc'>
                                <p>Keep all the charities you support in one place within your bookmarks and write about your journey with a charity by writing
                                    a review on their page</p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className='row'>
                    <section className='hero-full' id='hero-4'>
                        <div className='hero-content-full' id='hero-content-4'>
                            <h1>Get to know our organization</h1>
                            <a className='btn' href="/charities">Our Mission</a>
                        </div>
                    </section>
                </div>

                {/*                     <div className='title' id='Join'>
                    <h3>Join the ShareEgypt community</h3>
                    </div> */}

                <div className='row' style={{ 'padding-top': '3em', 'padding-bottom': '3em' }}>
                    <section className='hero-full' id='hero-6-left'></section>
                    <section className='hero-full' id='hero-6-right'>
                        <div className='hero-content-full' id='hero-content-6-right'>
                            <h3 id='hero-content-2-h3' style={{ 'color': 'white', 'font-size': '2em' }}>Join our community</h3>
                            <p>Today, Egyptian charities are struggling to find efficient ways to interact with their communities and maintain an environment where they can form close relationships
                                with their donors, reinforce trust within the charity, and share their accomplishments. <strong>ShareEgypt</strong> is a nonprofit organization that seeks to provide
                                Egyptian Charities a platform where compassionate individuals can support and stay in touch with thousands of charities all across Egypt through blog post, bookmarking
                                Together we will build a <strong>better future</strong></p>
                        </div>
                    </section>
                </div>

                {/*              <div className='title'>
                    <h1>Join the ShareEgypt community</h1>
                    </div>
                    
                    <div className='row'>
                    <section className='hero-full' id='hero-5'>
                        <div className='hero-content-full' id='hero-content-5'>
                            <h1>Together we will build a <strong>better future</strong></h1>
                        </div>
                    </section>
                    </div> */}
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;
