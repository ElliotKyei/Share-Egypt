import React from "react";
import { useState, useEffect } from "react";
import { db, auth } from '../firebase'
import { getDoc, doc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import './UserHomePage.css'

function UserHomePage() {

    const [charities, setCharities] = useState([]); //stores the user's bookmarked charities
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        setBlogs([])
        setCharities([])
        getUserCharities()
    }, [])

    const getUserCharities = () => {
        onAuthStateChanged(auth, (account) => {
            if (account) {
                //Before fetching charities/blogs, make sure arrays are empty
                setBlogs([])
                setCharities([])
                const accountType = localStorage.getItem("Type");
                var accountDoc;

                if (accountType === 'user')
                    accountDoc = doc(db, 'users', account.uid)
                if (accountType === 'charity')
                    accountDoc = doc(db, 'charities', account.uid)

                //Get the database document of the user
                getDoc(accountDoc).then((dbAccount) => {
                    let accountBookmarks = dbAccount.data().bookmarks

                    //loop through user's bookmarks and get charities/blogs
                    accountBookmarks.forEach(bookmark => {
                        let charityDoc = doc(db, 'charities', bookmark.charityId)
                        getDoc(charityDoc).then(charity => {
                            setCharities(arr => [...arr, charity.data()]);
                            if (charity.data().blogs) {
                                var charityBlogs = charity.data().blogs
                                charityBlogs.charityName = charity.data().name
                                setBlogs(arr => [...arr, charityBlogs])
                            }
                        })
                    });
                })
            }
        })
    }


    return (
        <div className="homepageBody">

            <div>

                <section className="header-section">
                    <div className="headerContent-section">
                        <h3>What's New</h3>
                    </div>
                </section>

                <div className="row" style={{ 'margin-top': '5em' }}>
                    <section className="mainSection">


                        <div className="mainSection-content">
                            {/* Blog Post Sections */}
                            {blogs.map((blog) => {
                                let charityTitleSet = false
                                return (
                                    Object.keys(blog).map((post) => {
                                        if (blog[post].post) {

                                            let imageUrl = ""

                                            if (blog[post].blogImageUrl) {
                                                imageUrl = blog[post].blogImageUrl
                                            }

                                            return (

                                                <div>

                                                    {charityTitleSet === false && (
                                                        <div className="blogCharityTitle">
                                                            <h3 style={{ 'color': 'white' }}><strong>{blog.charityName}</strong></h3>
                                                        </div>
                                                    )}

                                                    <div className="blogPost container">

                                                        {charityTitleSet = true}
                                                        <div className="blogTitle container text-center">
                                                            {imageUrl.length === 0 ?
                                                                (<div>
                                                                    <h4 style={{ 'text-align': 'center' }}>{blog[post].blogTitle}</h4>
                                                                    <p style={{ 'text-align': 'center', 'padding': '1.5em', 'margin-bottom': '2em', 'color': 'gray' }}>Announcement</p>
                                                                </div>
                                                                )
                                                                :
                                                                (<h4 style={{ 'text-align': 'center', 'padding': '1.5em', 'margin-bottom': '2em' }}>{blog[post].blogTitle}</h4>)
                                                            }
                                                        </div>

                                                        {imageUrl.length !== 0 && (
                                                            <div className="blogPic container text-center">
                                                                <img src={imageUrl} alt='blog pic' />
                                                            </div>
                                                        )}

                                                        <div className="blogDetails container text-center">
                                                            {imageUrl.length !== 0 && (
                                                                <p style={{ 'margin-bottom': '2em' }}>{blog[post].blogImageCaption}</p>
                                                            )}
                                                            <p style={{ 'text-align': 'start' }}>Published by {blog[post].blogPublisher}</p>
                                                            <p style={{ 'text-align': 'start', 'margin-bottom': '3em' }}>{blog[post].blogDate}</p>
                                                        </div>


                                                        <div className="blogContent container" dangerouslySetInnerHTML={{ __html: blog[post].blogHTML }}></div>

                                                        {/*        <div className="blogPost seperator"></div> */}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return true
                                    })
                                )
                            })
                            }

                        </div>
                    </section>
                    <section className="sidebar">
                        <div className="sidebar-content">
                            <ul>
                                <li></li>
                                <li>Charity 1</li>
                                <li>Charity 2</li>
                                <li>Charity 3</li>
                                <li>Charity 4</li>
                                <li>Charity 5</li>
                            </ul>
                        </div>
                    </section>

                </div>


            </div>
        </div>
    );
}

export default UserHomePage;