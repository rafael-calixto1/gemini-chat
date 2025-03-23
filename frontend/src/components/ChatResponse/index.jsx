import React from 'react';
import PropTypes from 'prop-types';
import ResponseCard from './ResponseCard';
import UsageMetadata from './UsageMetadata';

/**
 * Component that displays the chat response from the API
 * @param {Object} props - Component props
 * @param {Object|null} props.response - Response data from the API
 */
const ChatResponse = ({ response }) => {
    if (!response) {
        return null;
    }

    const { candidates, usageMetadata } = response;
    
    return (
        <div className="container my-4">
            <h3>Response</h3>
            
            {candidates.map((candidate, index) => (
                <ResponseCard 
                    key={index}
                    index={index}
                    content={candidate.content.parts[0].text}
                    citations={candidate?.citationMetadata?.citationSources || []}
                />
            ))}

            <UsageMetadata metadata={usageMetadata} />
        </div>
    );
};

ChatResponse.propTypes = {
    response: PropTypes.shape({
        candidates: PropTypes.array.isRequired,
        usageMetadata: PropTypes.object.isRequired
    })
};

export default ChatResponse; 