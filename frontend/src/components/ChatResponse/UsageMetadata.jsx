import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for displaying API usage metadata (token counts)
 * @param {Object} props - Component props
 * @param {Object} props.metadata - Usage metadata containing token counts
 */
const UsageMetadata = ({ metadata }) => {
    if (!metadata) {
        return null;
    }

    return (
        <div className="card mt-3">
            <div className="card-header bg-light">
                <h5 className="mb-0">API Usage Stats</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white">
                            <div className="card-body text-center">
                                <h6>Prompt Tokens</h6>
                                <h3>{metadata.promptTokenCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-success text-white">
                            <div className="card-body text-center">
                                <h6>Response Tokens</h6>
                                <h3>{metadata.candidatesTokenCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-info text-white">
                            <div className="card-body text-center">
                                <h6>Total Tokens</h6>
                                <h3>{metadata.totalTokenCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UsageMetadata.propTypes = {
    metadata: PropTypes.shape({
        promptTokenCount: PropTypes.number.isRequired,
        candidatesTokenCount: PropTypes.number.isRequired,
        totalTokenCount: PropTypes.number.isRequired
    })
};

export default UsageMetadata; 