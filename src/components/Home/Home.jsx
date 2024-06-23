import React, { useState, useEffect } from 'react';
import logo from '../../assets/Logo.png';
import './Home.css';
import { KeyWords } from '../KeyWords/KeyWords.jsx';
import { SearchBar } from '../SearchBar/SearchBar.jsx';
import api from '../../utils/AxiosAPIConfig.js';
import { ColorRing } from 'react-loader-spinner';

export const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [hoveredImage, setHoveredImage] = useState(null); // State to track hovered image

    const handleSearch = async (term, page = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(`/search/photos?page=${page}&query=${term}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }

            const { results, total_pages } = response.data;
            setSearchResults(results);
            setTotalPages(total_pages);
            setCurrentPage(page);
        } catch (error) {
            setError('Failed to fetch search results. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            handleSearch(searchTerm);
        }
    }, [searchTerm]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            handleSearch(searchTerm, pageNumber);
        }
    };

    const handleImageHover = (id) => {
        setHoveredImage(id);
    };

    const handleImageLeave = () => {
        setHoveredImage(null);
    };

    return (
        <>
            <div className="home-container">
                <div className="home-content d-flex flex-row">
                    <img src={logo} className="logo-image" alt="Photo-Garage Logo" />
                    <h1 className="home-title">Photo-Garage</h1>
                </div>
            </div>

            <SearchBar onSearch={handleSearchSubmit} />
            <KeyWords onSearch={handleSearchSubmit} />
            <br />

            {isLoading ? (
                <div className="d-flex justify-content-center mt-4">
                    <ColorRing
                        visible={true}
                        height={80}
                        width={80}
                        ariaLabel="color-ring-loading"
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : error ? (
                <p className="text-center mt-4">{error}</p>
            ) : (
                <>
                    {searchResults.length > 0 && (
                        <div className="container mt-4">
                            <h4 className="mb-3">Search Results for "{searchTerm}"</h4>
                            <div className="row">
                                {searchResults.map((result) => (
                                    <div key={result.id} className="col-md-3 mb-4">
                                        <div
                                            className="image-container position-relative"
                                            onMouseEnter={() => handleImageHover(result.id)}
                                            onMouseLeave={handleImageLeave}
                                        >
                                            <img
                                                src={result.urls.small}
                                                className="img-thumbnail rounded"
                                                alt={result.alt_description}
                                            />
                                            {hoveredImage === result.id && (
                                                <div className="image-tooltip">
                                                    <h5>{result.alt_description}</h5>
                                                    <p>Likes: {result.likes}</p>
                                                    <p>Photographer: {result.user.name}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    <li className="page-item disabled">
                                        <span className="page-link">
                                            {currentPage} of {totalPages}
                                        </span>
                                    </li>
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </>
    );
};
