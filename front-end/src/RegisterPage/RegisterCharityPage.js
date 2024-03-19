import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';
import './RegisterCharityPage.css'

const bcrypt = require('bcryptjs');
const saltRounds = 10;


function RegisterCharityAccount() {
    
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [values, setValues] = useState({
        charityId: "",
        name: "",
        email: "",
        email2: "",
        password: "",
        password2: "",
    });
    
    const registerCharity = async() => {
        createUserWithEmailAndPassword(auth, values.email, values.password).then((userInfo) => {
            const charityUser = userInfo.user

            const setCharityUser = {
                bio: "",
                category: "",
                charityCenter: "",
                charityId: values.charityId,
                coverURL: "",
                id: charityUser.uid,
                name: values.name,
                rating: "0.0",
                reviews: values.email,
                password: bcrypt.hashSync(values.password, bcrypt.genSaltSync(saltRounds)),
                subscribers: null,
                url: "",
                role: "charity"
              };

              
             try {
                setDoc(doc(db, "charities", charityUser.uid), setCharityUser);
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
                    err.password2 = "The email provided is already in use. Please enter a different one";
                    break;
                case "auth/weak-password":
                    err.password2 = "The password must be at least 6 characters";
                    break;   
                default:
                    err.password2 = error.message;
                    break;
                    }
                    
            setFormErrors(err);
        })
    }

    const handleChange = (e) => {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };
    
    const validate = () => {
        let errors = {};
    
        if (!values.charityId)
        errors.charityId = "Please enter your charity number";
       // else if ((!/^[0-9][0-9]-[0-9]+$/.test(values.charityId) || (values.charityId).length === 0))
       else if ((!/^[0-9][0-9][0-9][0-9][0-9][0-9]$/.test(values.charityId) || (values.charityId).length === 0))
        errors.charityId = "Please enter a valid charity number";
        if (!values.name)
        errors.name = "Please enter the name of your charity";
        if (!values.email)
            errors.email = "Please enter your email address";
        else if (!/\S+@\S+\.\S+/.test(values.email))
             errors.email = "Please enter your email in the format 'example@gmail.com'";

        if (values.email){
        if (values.email2.length === 0)
            errors.email2 = "The emails do not match. Please try again";
        else if (values.email2 !== values.email)
            errors.email2 = "The emails do not match. Please try again";
        }
        
              
        if (!values.password)
            errors.password = "Please enter your password";

 
            if (values.password){
                if (values.password2.length === 0) 
                    errors.password2 = "The passwords do not match. Please try again";
                else if(values.password2 !== values.password)
                    errors.password2 = "The passwords do not match. Please try again";
                }
            
    
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0){
            console.log("No errors in the register form");
            return true;
        }
        else{
            console.log("There were some errors in the register form")
            return false;
        } 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate(values)) {
        console.log("Form inputs are correct");
        await registerCharity();
        return true;
        }
        else {
            console.log("Form inputs are incorrect");
            return true;
        }
    };

    return (
        <div class="container">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
          
           <Card className="registerCharity-container" style={{ width: '280rem' }}>
               <h1 className="register-title">Register a Charity Account</h1>
                <Form onSubmit={handleSubmit} noValidate>
                <Form.Group as={Row} class="mb-3" controlId="charityIdSection">
                        <Form.Label className='register-label' column sm={2}>Charity Number</Form.Label>
                       <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="text"
                            name="charityId"
                            placeholder="charity number"
                            value={values.charityId}
                            onChange={handleChange}
                            required/>   

                        {formErrors.charityId && (
                         <p className="errorMsg text-danger">{formErrors.charityId}</p>
                        )}
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} class="mb-3" controlId="charityNameSection">
                        <Form.Label className='register-label' column sm={2}>Charity Name</Form.Label>
                       <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="text"
                            name="name"
                            placeholder="charity name"
                            value={values.name}
                            onChange={handleChange}
                            required/>   

                        {formErrors.name && (
                         <p className="errorMsg text-danger">{formErrors.name}</p>
                        )}
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as={Row} class="mb-3" controlId="emailSection">
                        <Form.Label className='register-label' column sm={2}>Email Address</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="email" 
                            name="email"
                            placeholder="email"
                            value={values.email}
                            onChange={handleChange}
                            required/>   
                          
                        {formErrors.email && (
                         <p className="errorMsg text-danger">{formErrors.email}</p>
                        )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} class="mb-3" controlId="emailSection">
                        <Form.Label className='register-label' column sm={2}>Confirm Email Address</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="email" 
                            name="email2"
                            placeholder="confirm email"
                            value={values.email2}
                            onChange={handleChange}
                            required/>   
                          
                        {formErrors.email2  && (
                         <p className="errorMsg text-danger">{formErrors.email2}</p>
                        )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} class="mb-3" controlId="passwordSection">
                        <Form.Label className='register-label' column sm={2}>Password</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="password"
                            name="password"
                            placeholder="password"
                            value={values.password}
                            onChange={handleChange}
                            required/>
                        {formErrors.password && (
                      <p className="errorMsg text-danger">{formErrors.password}</p>
                    )}
                    </Col>
                    </Form.Group>

                    <Form.Group as={Row} class="mb-3" controlId="passwordSection">
                        <Form.Label className='register-label' column sm={2}>Confirm Password</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                            className='register-input' 
                            type="password"
                            name="password2"
                            placeholder="confirm password"
                            value={values.password2}
                            onChange={handleChange}
                            required/>

                        {formErrors.password2 && (
                      <p className="errorMsg text-danger">{formErrors.password2}</p>
                    )}
                    </Col>
                    </Form.Group>
               
                    <div className="d-grid gap-2">
                        <Button size="lg" type="submit" className="submit-button text-center" variant="primary">Register</Button>
                    </div>
                
                </Form>
                <Link to='/login' className='sign-in'>Already have a charity account? Sign In</Link>
            </Card>

        </div>
    );
}

export default RegisterCharityAccount;
