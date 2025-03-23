import axios from 'axios';

/**
 * Base API URL from environment or default
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * API Endpoints
 */
export const ENDPOINTS = {
    TEXT_CHAT: '/qna/ask',
    IMAGE_CHAT: '/qna/ask-with-image',
    AUDIO_CHAT: '/qna/ask-with-audio'
};

/**
 * Configured Axios instance for API requests
 */
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Request interceptor for API calls
 */
apiClient.interceptors.request.use(
    config => {
        // You can add auth headers or other request configuration here
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor for API calls
 */
apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Global error handling can go here
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default apiClient; 