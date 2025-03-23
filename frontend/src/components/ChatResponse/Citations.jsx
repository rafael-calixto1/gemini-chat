import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for displaying citation sources
 * @param {Object} props - Component props
 * @param {Array} props.sources - Citation sources
 */
const Citations = ({ sources }) => {
    if (!sources || sources.length === 0) {
        return null;
    }

    return (
        <ul className="list-group">
            {sources.map((source, idx) => (
                <li className="list-group-item" key={idx}>
                    <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        {source.uri}
                    </a>
                    <small className="text-muted ms-2">
                        (Indexes: {source.startIndex} - {source.endIndex})
                    </small>
                </li>
            ))}
        </ul>
    );
};

Citations.propTypes = {
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            uri: PropTypes.string,
            startIndex: PropTypes.number,
            endIndex: PropTypes.number
        })
    ).isRequired
};

export default Citations; 