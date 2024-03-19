import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Form } from 'react-bootstrap';
import { auth, db} from '../firebase.js'
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './RegisterUserPage.css'

const bcrypt = require('bcryptjs')
const saltRounds = 10;

function RegisterUserPage() {

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({
        email: "",
        password: "",
        name: ""
    });


    const createUser = async() => {
        createUserWithEmailAndPassword(auth, values.email, values.password).then((userInfo) => {
            const user = userInfo.user

            const setUser = {
            id: user.uid,
            name: values.name,
            username: values.name + Math.floor(Math.random() * 100),
            password: bcrypt.hashSync(values.password, bcrypt.genSaltSync(saltRounds )),
            email: values.email,
            phoneNumber: "",
            subscriptions: null,
            bookmarks: null,
            avatarURL: "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg",
            role: "user"
        }

             try {
               setDoc(doc(db, "users", user.uid), setUser);
             }
             catch (err) {
                console.log(err.message);
             }

              navigate("/login");
        })
        .catch((error) => {
            const errorCode = error.code;
            let err = {};
            switch (errorCode) {
                case "auth/email-already-in-use":
                    err.name = "The email provided is already in use. Please enter a different one";
                    break;
                case "auth/weak-password":
                    err.name = "The password must be at least 6 characters";
                    break;   
                default:
                    err.name = error.message;
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

        if (!values.name)
            errors.name = "Please enter your name";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("No errors in the register form");
            return true;
        }
        else {
            console.log("There were some errors in the register form")
            return false;
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();


        if (validate(values)) {
            await createUser();
            console.log("Form Submission Successful"); 
            return true;
        }
        else {
            console.log("Form Submission Unsuccessful");
            return true;
        }
    };

    return (

        <div class="register container-fluid">

            <Card className="register-container" >
                <h1 className="register-title">Register for a user account</h1>
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="emailSection">
                        <Form.Label className='register-label'>Email Address</Form.Label>
                        <Form.Control
                            className='register-input'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                        />

                        {formErrors.email && (
                            <p className="errorMsg text-danger">{formErrors.email}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="passwordSection">
                        <Form.Label className='register-label'>Password</Form.Label>
                        <Form.Control
                            className='register-input'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            required />
                        {formErrors.password && (
                            <p className="errorMsg text-danger">{formErrors.password}</p>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nameSelection">
                        <Form.Label className='register-label'>Name</Form.Label>
                        <Form.Control
                            className='register-input'
                            type="name"
                            name="name"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            required />
                        {formErrors.name && (
                            <p className="errorMsg text-danger">{formErrors.name}</p>
                        )}
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button size="lg" type="submit" className="submit-button text-center" variant="primary">Register</Button>
                    </div>
            
                </Form>
                <Link to='/registerCharity' className='signup'>Or Register for a charity account here</Link>
            </Card>
        </div>
    );
}

export default RegisterUserPage;
