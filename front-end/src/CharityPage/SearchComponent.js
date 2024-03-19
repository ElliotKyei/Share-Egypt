import React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebase'

function SearchComponent() {

    const [searchBarInput, setSearchBarInput] = useState('');
    const navigate = useNavigate();

    const searchSubmit = (event) => {
        event.preventDefault();
        navigate.push(`/all?search=${encodeURIComponent(searchBarInput)}`);
        window.location.reload()
        return false;
    }
    return (                    
    <Form onSubmit={searchSubmit} className='mx-4 px-3 w-25 searchbar'>
    <InputGroup>
        <FormControl
            onChange={(e) => setSearchBarInput(e.target.value)}
            type='search'
            style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
            placeholder='Giza, Education' />
        <Button
            type='submit'
            className={searchBarInput.trim() === '' ? 'searchBtn' : 'searchBtnEnabled'} // ternary condition to check if navbar is empty
            {...{ disabled: searchBarInput.trim() === '' }}>
            Search
        </Button>
    </InputGroup>
</Form>)}
    export default SearchComponent;