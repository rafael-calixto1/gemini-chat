import PropTypes from "prop-types";

/**
 * Renders a preview of the uploaded media (image or audio)
 * @param {Object} props - Component props
 * @param {string} props.type - Type of media ('image' or 'audio')
 * @param {string} props.data - Data URL of the media content
 */
const MediaPreview = ({ type, data }) => {
    if (!data) return null;

    return (
        <div className="mb-3">
            {type === 'image' && (
                <img 
                    src={data} 
                    alt="Preview" 
                    className="img-thumbnail" 
                    style={{ maxHeight: "200px" }} 
                />
            )}

            {type === 'audio' && (
                <audio 
                    controls 
                    src={data}
                    className="w-100"
                />
            )}
        </div>
    );
};

MediaPreview.propTypes = {
    type: PropTypes.oneOf(['image', 'audio']).isRequired,
    data: PropTypes.string.isRequired
};

export default MediaPreview; 