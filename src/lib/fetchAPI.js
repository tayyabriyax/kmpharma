const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAPI = async (endpoint, options = {}) => {
    const {
        method = 'GET',
        data,
        token,
        headers = {},
        params = {},
    } = options;

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        body: ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
            ? JSON.stringify(data)
            : undefined,
    });

    if (response.status === 401) {
        const { store } = await import('./store');
        const { REMOVE_ACTIVE_USER } = await import('./slices/authSlice');
        store.dispatch(REMOVE_ACTIVE_USER());
        throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        const message =
            errorData?.errors?.[0] || errorData?.message || "Something went wrong";

        const error = new Error(message);
        error.data = errorData;
        throw error;
    }

    return response.json();
};
