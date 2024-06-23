import './KeyWords.css';
import museum from '../../assets/mountains.gif';
import parrot from '../../assets/city-park.gif';
import flower from '../../assets/flower.gif';
import island from '../../assets/island.png';

export const KeyWords = ({ onSearch }) => {
    const handleClick = (keyword) => {
        onSearch(keyword);
    };

    return (
        <div className="keywords-container">
            <div className="keyword-item" title="Search Mountains" onClick={() => handleClick('Mountains')}>
                <img src={museum} alt="Mountains" className="keyword-image" />
                <h3 className="keyword-title">Mountains</h3>
            </div>
            <div className="keyword-item" title="Search Flowers" onClick={() => handleClick('Flowers')}>
                <img src={flower} alt="Flowers" className="keyword-image" />
                <h3 className="keyword-title">Flowers</h3>
            </div>
            <div className="keyword-item" title="Search Beaches" onClick={() => handleClick('Beaches')}>
                <img src={island} alt="Beaches" className="keyword-image" />
                <h3 className="keyword-title">Beaches</h3>
            </div>
            <div className="keyword-item" title="Search Cities" onClick={() => handleClick('Cities')}>
                <img src={parrot} alt="Cities" className="keyword-image" />
                <h3 className="keyword-title">Cities</h3>
            </div>
        </div>
    );
};
