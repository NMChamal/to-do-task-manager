const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const registerUser = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
    }
    return await response.json();
};

export const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
    }
    return await response.json();
};

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return await response.json();
};

export const createTask = async (title: string, description: string) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return await response.json();
};

export const updateTask = async (id: number, title: string, description: string) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return await response.json();
};

export const markTaskAsCompleted = async (id: number) => {
    const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to mark task as completed');
    }
    return await response.json();
};
