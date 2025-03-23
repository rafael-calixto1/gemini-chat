import React from 'react';
import PropTypes from 'prop-types';
import Citations from './Citations';

/**
 * Component for displaying a single response candidate
 * @param {Object} props - Component props
 * @param {number} props.index - Index of the candidate
 * @param {string} props.content - Text content of the response
 * @param {Array} props.citations - Citation sources
 */
const ResponseCard = ({ index, content, citations }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Candidate {index + 1}</h5>
                <p className="card-text">{content}</p>
                
                {citations.length > 0 && (
                    <>
                        <h6>Citations:</h6>
                        <Citations sources={citations} />
                    </>
                )}
            </div>
        </div>
    );
};

ResponseCard.propTypes = {
    index: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    citations: PropTypes.arrayOf(
        PropTypes.shape({
            uri: PropTypes.string,
            startIndex: PropTypes.number,
            endIndex: PropTypes.number
        })
    ).isRequired
};

export default ResponseCard; 