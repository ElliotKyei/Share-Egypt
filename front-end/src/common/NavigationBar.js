import React from 'react';
import './NavigationBar.css';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import ProfileIcon from '../Images/ProfileIcon.jpg'

function NavigationBar() {
    // const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [accountType, setAccountType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Use effect running")
        let loggedInAccount = localStorage.getItem("Account");
        let accountType = localStorage.getItem("Type");
        if (loggedInAccount) {
            console.log(`The account ${loggedInAccount} of type ${accountType} is logged in`)
            loggedInAccount = loggedInAccount.replace('"', "");
            loggedInAccount = loggedInAccount.replace('"', "");
            accountType = accountType.replace('"', "");
            accountType = accountType.replace('"', "");
            setAccount(loggedInAccount);
            setAccountType(accountType);
        }
    });

    const logout = () => {
        localStorage.setItem("Account", "");
        localStorage.setItem("Type", "");
        setAccount("");

        signOut(auth).then(() => {
            navigate("/login")
        })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>

            {account.length !== 0 ?

                (
                    <Navbar bg="light">
                        <Container>

                            <Navbar.Brand href="/home" id="logo">SE</Navbar.Brand> {/* this will be replaced by a logo */}
                            <Navbar.Toggle />
                            <Nav.Link href="/home" className="navbar-item">Home</Nav.Link>
                            <Nav.Link href="/charities" className="navbar-item">Discover</Nav.Link>
                            <Nav.Link href="/search" className="navbar-item">Find Charity</Nav.Link>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text style={{ "margin-right": "1em" }}>
                                    Welcome, {account}
                                </Navbar.Text>

                                <NavDropdown title="Profile" id="basic-nav-dropdown" style={{ 'margin-right': '3em' }}>
                                    <Container className='container'>
                                        {<img alt="profile pic" src={ProfileIcon} width="150px" height="125px" />}
                                        <NavDropdown.Header style={{ 'padding-bottom': '1em' }} color="blue">{account}</NavDropdown.Header>


                                        {accountType === "user" ?

                                            (<div>
                                                <NavDropdown.Item href="/bookmarks">Bookmarks</NavDropdown.Item>
                                                <NavDropdown.Item href="/userprofile">Reviews</NavDropdown.Item>
                                                <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                                            </div>) 

                                            :
                                            
                                            (<div>
                                                <NavDropdown.Item href="/createBlog">Create a Blog</NavDropdown.Item>
                                                <NavDropdown.Item href="/userprofile">Reviews</NavDropdown.Item>
                                                <NavDropdown.Item href="/userprofile">My Profile</NavDropdown.Item>
                                            </div>)
                                        }

                                        <NavDropdown.Divider />
                                        <NavDropdown.Header>
                                            <Button type="submit" variant="outline-primary" className="navbar-button" onClick={logout} size="sm" style={{ 'margin-left': '-0.1em', 'margin-top': '0.7em' }}>Logout</Button>
                                        </NavDropdown.Header>
                                    </Container>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                ) :

                (

                    <Navbar bg="light">
                        <Container>

                            <Navbar.Brand href="/" id="logo">SE</Navbar.Brand> {/* this will be replaced by a logo */}
                            <Navbar.Toggle />
                            <Nav.Link href="/charities" className="navbar-item">Discover</Nav.Link>
                            <Nav.Link href="/search" className="navbar-item">Find Charity</Nav.Link>

                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <LinkContainer to={"/login"} >
                                        <Button type="submit" variant="outline-primary" className="navbar-button">Login</Button>
                                    </LinkContainer>
                                    <LinkContainer to={"/register"} >
                                        <Button type="submit" variant="outline-primary" className="navbar-button">Register</Button>
                                    </LinkContainer>
                                </Navbar.Text>
                            </Navbar.Collapse>

                        </Container>
                    </Navbar>
                )}
        </div>
    );
};

export default NavigationBar;
