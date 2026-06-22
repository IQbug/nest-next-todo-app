import axios from 'axios';

const API_URL = 'http://localhost:3001/todos';

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTodo = async (title: string) => {
    const response = await axios.post(API_URL, {
        title,
    });

    return response.data;
};

export const deleteTodo = async (id: number) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
    );

    return response.data;
};

export const updateTodo = async (
    id: number,
    completed: boolean,
) => {
    const response = await axios.patch(
        `${API_URL}/${id}`,
        {
            completed,
        },
    );

    return response.data;
};