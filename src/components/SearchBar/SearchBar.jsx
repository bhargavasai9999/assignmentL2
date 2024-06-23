import './SearchBar.css';
import { useState } from 'react';
import { Form, FormControl, InputGroup, Container } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
    };

    return (
        <Container className="search-bar-container">
            <Form onSubmit={handleSearchSubmit} className='d-flex align-end'>
                <InputGroup>
                    <FormControl
                        type="text"
                        placeholder="Search Images Here"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <InputGroup.Text className='btn btn-primary'>
                        
                        <FaSearch />
                        
                    </InputGroup.Text>
                </InputGroup>
            </Form>
        </Container>
    );
};
