const apiUrl = 'http://127.0.0.1:8000/api/users';

export const userService = {
    getUsers() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiUrl,
                method: 'GET', // POST, PUT, DELETE
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    },

    createUser(newUser) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${apiUrl}/create`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(newUser),
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    },

    getUser(userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${apiUrl}/${userId}`,
                method: 'GET',
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    },

    updateUser(userId, body) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${apiUrl}/${userId}`,
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(body),
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    },

    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${apiUrl}/${userId}`,
                method: 'DELETE',
                success: (data) => {
                    resolve(data);
                },
                error: (xhr, status, error) => {
                    reject(error);
                },
            });
        });
    },
};
