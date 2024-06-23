import './SearchBar.css';
import { useState } from 'react';
import { Form, FormControl, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm.trim());
    };

    return (
        <Container className="search-bar-container">
            <Row className="justify-content-center">
                <Col lg={12}>
                    <Form onSubmit={handleSubmit} className='d-flex'>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search Images Here"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <InputGroup.Text as="button" type="submit" className='btn btn-primary'>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
