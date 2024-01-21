import { userService } from './userService.js';

const btnAdd = $('#btn-add');
const form = $('#form');
const listInfo = $('#list-users');
const name = $('#name');
const email = $('#email');
const address = $('#address');
const closeBtn = $('#close-btn');

let users;
let userSelected;

loadData();

function loadData() {
    userService
        .getUsers()
        .then((data) => {
            users = data;
            users.sort((user1, user2) => user2.id - user1.id);
            renderListInfo(users);
        })
        .then((err) => {
            console.error(err);
        });
}

// btnAdd.click(() => {

// })

form.submit((event) => {
    event.preventDefault(); // Ngăn chặn form gửi đi (refresh trang)
    const newUser = {
        name: name.val(),
        email: email.val(),
        address: address.val(),
    };
    if (!userSelected.id) {
        createUser(newUser);
    } else {
        updateUser(userSelected.id, newUser);
    }
});

function createUser(newUser) {
    userService
        .createUser(newUser)
        .then((data) => {
            // const newU = {
            //     id: data.id,
            //     name: data.name,
            //     email: data.email,
            //     address: data.address
            // }
            // users.push(newU);
            // renderListInfo(users)
            loadData();
            closeBtn.click();
        })
        .then((err) => {
            console.error(err);
        });
}

function updateUser(userId, body) {
    userService
        .updateUser(userId, body)
        .then((data) => {
            loadData();
            closeBtn.click();
        })
        .then((err) => {
            console.error(err);
        });
}

// Sửa
listInfo.on('click', '#btn-edit', (event) => {
    btnAdd.click();
    const userId = $(event.target).data('user-id');
    userService
        .getUser(userId)
        .then((user) => {
            name.val(user.name);
            email.val(user.email);
            address.val(user.address);
            userSelected = {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
            };
        })
        .then((err) => {
            console.error(err);
        });
});

// Xóa
listInfo.on('click', '#btn-delete', (event) => {
    const userId = $(event.target).data('user-id');
    userService
        .deleteUser(userId)
        .then((data) => {
            console.log(data);
            isLoading = false;
            loadData();
        })
        .then((err) => {
            console.error(err);
        });
});

function renderListInfo(users) {
    const htmlContent = `
    ${users.map((user) => {
        return `
            <tr>
            <th scope="row">${user.id}</th>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td class="text-end">
                <button id="btn-edit" class="btn btn-info" data-user-id="${user.id}">Edit</button>
                <button id="btn-delete" class="btn btn-danger" data-user-id="${user.id}">Delete</button>
            </td>
        </tr>
            `;
    })}
    `;
    listInfo.html(htmlContent);
}
