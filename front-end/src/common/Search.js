import React from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AsyncSelect from 'react-select/async';
import { Component } from 'react'
import "./Search.css"
import { Button } from "react-bootstrap";



class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTag: [],
            enableBookmarks: false,
            alreadyBookmarked: false,
            blogs: null,
            user: auth.currentUser
        }
    }

    loadOptions = async (inputValue) => {
        //inputValue = inputValue.toLowerCase().replace(/\W/g, "");
        return new Promise((resolve => {
            db.collection('charities')
                .orderBy('name')
                .startAt(inputValue)
                .endAt(inputValue + "\uf8ff")
                .get()
                .then(docs => {
                    if (!docs.empty) {
                        let recommendedTags = []
                        docs.forEach(function (doc) {
                            const tag = {
                                value: doc.id,
                                label: doc.data().name,//tagName
                                bio_: doc.data().bio,
                                category_: doc.data().category,
                                rating_: doc.data().rating,
                                pfp_: doc.data().coverURL,
                                location_: doc.data().charityCenter,
                                url_: doc.data().url,
                                blogPosts: doc.data().blogs
                            }

                            recommendedTags.push(tag)
                        });
                        this.forceUpdate();
                        return resolve(recommendedTags)
                    } else {
                        return resolve([])
                    }
                })
        })
        )
    }

    handleOnChange = (tags) => {
        this.setState({
            selectedTag: [tags]
        })
        this.getBookmarkStatus()
    }

    componentDidMount = () => this.getBookmarkStatus();

    getBookmarkStatus = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Check if the user has bookmarked the charity
                if (this.state.alreadyBookmarked === true)
                    this.setState({ alreadyBookmarked: false })

                //Get the selected charity and the user's data
                if (this.state.selectedTag[0] && localStorage.getItem('Type') === 'user') {
                    console.log("Charity: ", this.state.selectedTag[0].label)
                    let getAccount = doc(db, 'users', user.uid)
                    getDoc(getAccount).then((account) => {
                        var userBookmarks = account.data().bookmarks

                        //check if the charity has already been added to the user's bookmarks
                        userBookmarks.forEach((bookmark) => {
                            if (bookmark.charityId === this.state.selectedTag[0].value) {
                                if (this.state.alreadyBookmarked === false)
                                    this.setState({ alreadyBookmarked: true })
                            }
                        })
                    })
                }

                if (this.state.enableBookmarks === false)
                    this.setState({ enableBookmarks: true })
            }
        });
        return 0;
    }

    handleBookmark = () => {
        onAuthStateChanged(auth, (account) => {
            if (account) {

                //Add the bookmark to the user's bookmark array

                console.log("Adding bookmark")
                let bookmarkDoc;
                let accountType = localStorage.getItem('Type')

                if (accountType === "user")
                    bookmarkDoc = doc(db, "users", account.uid)

                else if (accountType === "charity")
                    bookmarkDoc = doc(db, "charities", account.uid)

                const charityBookmark = {
                    charityName: this.state.selectedTag[0].label,
                    charityId: this.state.selectedTag[0].value
                }

                //Add the charity to the user's bookmarks in database
                updateDoc(bookmarkDoc, {
                    bookmarks: arrayUnion(charityBookmark)
                })

                //Add user to the Charity's subscriber list

                let charityDoc = doc(db, 'charities', this.state.selectedTag[0].value)
                updateDoc(charityDoc, {
                    subscribers: arrayUnion(account.email)
                })

                this.getBookmarkStatus();
                return true
            }
        })
    }

    handleUnbookmark = () => {
        console.log("Removing bookmark")
        //check if user is signed in
        onAuthStateChanged(auth, (account) => {
            if (account) {

                //get the first charity returned
                let selectedCharity = this.state.selectedTag[0];

                if (selectedCharity && localStorage.getItem('Type') === 'user') {
                    let accountDoc = doc(db, 'users', account.uid)
                    getDoc(accountDoc).then((account) => {
                        var userBookmarks = account.data().bookmarks

                        //get the user's bookmarks, search for the charity, and remove it
                        userBookmarks.forEach((bookmark) => {
                            if (bookmark.charityId === selectedCharity.value)
                                updateDoc(accountDoc, {
                                    bookmarks: arrayRemove(bookmark)
                                });
                        })

                        //set the bookmarked state of the charity to false
                        if (this.state.alreadyBookmarked === true)
                            this.setState({ alreadyBookmarked: false })
                        console.log("remove: already bookmarked is", this.state.alreadyBookmarked)
                    })

                }
                return true
            }
        })
    }

    handleRender = () => {
        const history = useNavigate();
        history(`/search`);
    }

    render() {
        return (
            <div>
                <AsyncSelect

                    placeholder='Find Charity...'
                    loadOptions={this.loadOptions}
                    onChange={this.handleOnChange}

                />
                {
                    this.state.selectedTag.map(e => {
                        return (
                            //redireect to a search result page 
                            <div>
                                <div key={e.value} className="wrapper" style={{ 'padding-top': '10em' }}>
                                    <div className="profile">
                                        <div className="profile_img_info">
                                            <div className="img">
                                                <img src={e.pfp_} className="card-img-top" alt="" />
                                            </div>
                                            <div className="text-center info" style={{ 'margin-left': '-1em' }}>
                                                <p className="userName">{e.label}</p>

                                                {this.state.enableBookmarks && (

                                                    this.state.alreadyBookmarked ?
                                                        (<Button size="sm" variant="secondary" style={{ 'margin-top': '1em' }} onClick={this.handleUnbookmark}>Unbookmark</Button>)
                                                        :
                                                        (<Button size="sm" style={{ 'margin-top': '1em' }} onClick={this.handleBookmark}>Bookmark</Button>)

                                                )}


                                            </div>
                                        </div>



                                        <div className="profile_skills">
                                            <div className="skills">
                                                <p>More Information</p>
                                                <ul>
                                                    <li><span className="icon"><i className="fab fa-html5"></i></span>
                                                        <span className="contact">Rating: {e.rating_}</span>
                                                    </li>
                                                    <li><span className="icon"><i className="fab fa-css3-alt"></i></span>
                                                        <span className="contact">Category: {e.category_}</span></li>
                                                    <li><span className="icon"><i className="fab fa-js-square"></i></span>
                                                        <span className="contact">URL: {e.url_}</span></li>
                                                </ul>
                                            </div>
                                            <div className="tags_wrap">
                                                {e.bio_}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="profile_counts">
                                        <div className="profile_counts_wrap">
                                            <div className="item">
                                                <div className="icon"><i className="fas fa-thumbs-up"></i></div>
                                                <div className="titleBm">LOCATION</div>
                                            </div>
                                        </div>
                                        <div className="profile_counts_wrap">
                                            <div className="item">
                                                <div className="icon"><i className="fas fa-eye"></i></div>
                                                <div className="titleSub">City: {e.location_}</div>
                                            </div>
                                        </div>
                                        <div className="profile_counts_wrap">
                                            <div className="item">
                                                <div className="icon"><i className="fas fa-comment"></i></div>
                                                <div className="titleEdt">Country: Egypt</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {e.blogPosts && (
                                    <div className="blogPosts">
                                        <h1 className="text-center"><strong>Latest Blog Posts</strong></h1>

                                        {Object.keys(e.blogPosts).map((post) => {
                                            if (e.blogPosts[post].post) {
                                                return (
                                                    <div classNameName="container">
                                                        <div className="blogTitle container text-center">
                                                            <h2 style={{ 'text-align': 'center', 'padding': '1.5em' }}>{e.blogPosts[post].blogTitle}</h2>
                                                        </div>

                                                        <div className="blogData container" dangerouslySetInnerHTML={{ __html: e.blogPosts[post].blogHTML }}></div>
                                                    </div>
                                                )
                                            }
                                            return true
                                        })
                                        }

                                    </div>)}

                            </div>)
                    })
                }

            </div>
        );
    }

}
export default Search;


