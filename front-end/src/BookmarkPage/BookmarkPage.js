import React from "react";
import { useState } from "react";
import { db, auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { CloseButton, Modal, Button } from "react-bootstrap";
import './BookmarkPage.css'
function BookmarkPage() {

    const [charities, setCharities] = useState([]);
    const [unbookmark, setUnbookmark] = useState([]);
    const [show, setShow] = useState(false);

    //event handler to display unbookmark modal and store the charity to unbookmark in a useState
    const handleShow = (charity) => {
        setUnbookmark(charity);
        setShow(true);
    }

    //event handler to close the unbookmark modal
    const handleClose = () => setShow(false);


    window.addEventListener('load', () => {
        getBookmarks();
    });

    // Fetch the required data using the get() method
    const getBookmarks = () => {
        console.log("getting bookmarks")
        onAuthStateChanged(auth, (account) => {
            if (account) {
                let accountDoc;
                const accountType = localStorage.getItem("Type");

                if (accountType === "user")
                    accountDoc = doc(db, 'users', account.uid)
                else if (accountType === "charity")
                    accountDoc = doc(db, 'charities', account.uid)

                getDoc(accountDoc).then((acc) => {
                    let accountBookmarks = acc.data().bookmarks
                    // Loop through the user's bookmarks and store the charity's data for rendering
                    setCharities([])
                    accountBookmarks.forEach(bookmark => {
                        let bookmarkItem = doc(db, 'charities', bookmark.charityId)
                        getDoc(bookmarkItem).then((charity) => {
                            setCharities(arr => [...arr, charity.data()]);
                        })
                    });
                })
            }
        })

    }


    const handleUnbookmark = (id) => {
        onAuthStateChanged(auth, (account) => {
            if (account) {
                //check if the logged in account is of type 'user'
                if (localStorage.getItem('Type') === 'user') {
                    let accountDoc = doc(db, 'users', account.uid)
                    getDoc(accountDoc).then((account) => {
                        var userBookmarks = account.data().bookmarks

                        //loop through the user's bookmarks and find the charity stored in the unbookmark useState for removal
                        userBookmarks.forEach((bookmark) => {
                            let charityId = unbookmark.id.toString()

                            if (bookmark.charityId === charityId) {
                                updateDoc(accountDoc, {
                                    bookmarks: arrayRemove(bookmark)
                                }).then(() => getBookmarks());
                            }
                        })
                    })

                }
            }
        })

        setShow(false);
    }

    return (
        <div>

            <h1 id="bookmark-title">My Bookmarks</h1>

            <div className="clearfix">
                <section className="charityContainer">
                    {
                        charities.map((data) => (

                            <div className="charity animated fadeIn">
                                <div className="card">
                                    <div className="card-body">
                                        <div style={{ 'float': 'right' }}><CloseButton onClick={() => { handleShow(data) }} /></div>
                                        <div className="avatar">
                                            <img
                                                src={data.coverURL}
                                                className="card-img-top"
                                                alt=""
                                            />
                                        </div>
                                        <center>
                                            <h5 className="card-title">
                                                {data.name}
                                            </h5>
                                        </center>
                                        <p className="card-text">
                                            <center>
                                                Location: {data.charityCenter}
                                            </center>
                                            <br />
                                            <center>
                                                <span className="phone">Rating: {data.rating}</span>
                                            </center>
                                        </p>
                                    </div>
                                </div>

                                <div className="unbookmark-popup">
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        aria-labelledby="contained-modal-title-vcenter"
                                        animation={true}
                                        backdrop={false}
                                        className="unbookmark-modal"
                                        centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title style={{ 'textAlign': 'center' }}>Unbookmark  <strong>{unbookmark.name}</strong></Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ 'textAlign': 'center' }}>Are you sure you want to unbookmark this charity?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => { handleUnbookmark(data.id) }}>
                                                Unbookmark
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>



                        ))
                    }
                </section>
            </div>


        </div>
    );
}

export default BookmarkPage;