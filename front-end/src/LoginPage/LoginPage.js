import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './LoginPage.css'
import { auth, db } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc} from 'firebase/firestore'

function LoginPage() {

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const login = async() => {
        signInWithEmailAndPassword(auth, values.email, values.password).then(async (acc) => {
        const account = acc.user; 

                const getUser = doc(db, "users", account.uid);
                const getCharity = doc(db, "charities", account.uid);
                const userSnap = await getDoc(getUser);
                const charitySnap = await getDoc(getCharity);

                if (userSnap.exists()) {
                console.log("Document data:", userSnap.data());
                localStorage.setItem('Account', userSnap.data().name)
                localStorage.setItem('Type', userSnap.data().role)
                } 
                else if (charitySnap.exists()) {
                    console.log("Document data:", charitySnap.data());
                    localStorage.setItem('Account', charitySnap.data().name)
                    localStorage.setItem('Type', charitySnap.data().role)
                }

            else {
             console.log("No such document!");
             }

        navigate("/home");
        return true;
    })
    .catch((error) => {
        const errorCode = error.code;
        let err = {};
        switch (errorCode) {
            case "auth/user-not-found":
                err.password = "There is no ShareEgypt account registered with this email";
                break;
            case "auth/wrong-password":
                err.password = "The password was incorrect. Please try again";
                break;   
            default:
                err.password = "An error has ocurred. The login attempt has failed";
                break;
                }
                
        setFormErrors(err);
    })
    };
    
    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        let errors = {};

        if (!values.email)
            errors.email = "Please enter your email address";
        else if (!/\S+@\S+\.\S+/.test(values.email))
            errors.email = "Please enter your email in the format 'example@gmail.com'";

        if (!values.password)
            errors.password = "Please enter your password";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("No errors in the login form");
            return true;
        }
        else {
            console.log("There were some errors in the login form")
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate(values)) {
            console.log("Form Submission Successful");
            await login();
            
            return true;
        }
        else {
            console.log("Form Submission Unsuccessful");
            return true;
        }
    };

    return (
        
        <div class="container">

            <Card className="login-container">
                <h1 className="login-title">Login</h1>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group class="mb-3" controlId="emailSection">
                        <Form.Label className='login-label'>Email Address</Form.Label>
                        <Form.Control
                            className='login-input'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />

                        {formErrors.email && (
                            <p className="text-danger">{formErrors.email}</p>
                        )}
                    </Form.Group>

                    <Form.Group class="mb-3" controlId="passwordSection">
                        <Form.Label className='login-label'>Password</Form.Label>
                        <Form.Control
                            className='login-input'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            required />
                        {formErrors.password && (
                            <p className="text-danger">{formErrors.password}</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                    <div className="d-grid gap-2">
                        <Button size="lg" type="submit" className="submit-button text-center" variant="primary">Login</Button>
                    </div>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    );
}

export default LoginPage;
