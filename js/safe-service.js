'use strict';
var gNextId = 101;
var gUsers = createUsers()


function createUsers() {
    return [
        createUser('Admin', '1234', true),
        createUser('Mulu', '2345', false),
        createUser('Zrobavel', '4567', false),
        createUser('Gershon', '3456', false)
    ]
}

function createUser(username, pass, isAdmin) {
    var firstDate = new Date(0).toLocaleString()
    return {
        id: gNextId++,
        username: username,
        pass: pass,
        isAdmin: isAdmin,
        lastLoginTime: localStorage.getItem(username) ? localStorage.getItem(username) : firstDate
    }
}

function checkLogin(username, pass) {
    if (!username) return showMessage('please insert username!')
    if (!pass) return showMessage('please insert password!')
    var user = gUsers.find(function (user) {
        return user.username === username
    })
    if (!user) return showMessage('no user, please check username again');

    var userPass = user.pass
    if (pass !== userPass) return showMessage('wrong password!')
    if (pass === userPass) {
        renderUsersArea(username)

        localStorage.setItem('loggedInUser', JSON.stringify(user))
        user.lastLoginTime = new Date().toLocaleString()
        localStorage.setItem(username, user.lastLoginTime)
    }
    if (user.isAdmin) renderAdminLink(user)
}
function checkIfAdmin() {
    var user = localStorage.getItem('loggedInUser')

    if (!user) return false
    if (JSON.parse(user).isAdmin) return true
    if (!JSON.parse(user).isAdmin) {
        localStorage.removeItem('loggedInUser')
        return false
    }
}

function logOut() {

    if (confirm('are you sure you wanna log out?')) {
        localStorage.removeItem('loggedInUser')
        return true

    } else return false
}

function setSort(sortBy) {
    if (sortBy === 'username')
        gUsers.sort(compareNames)

    if (sortBy === 'Last Login')
        gUsers.sort(compareDates)

}

function compareNames(a, b) {
    var username1 = a.username.toUpperCase()
    var username2 = b.username.toUpperCase()
    if (username1 < username2) {
        return -1;
    }
    if (username1 > username2) {
        return 1;
    }
    return 0;
}

function compareDates(a, b) {

    return new Date(b.lastLoginTime) - new Date(a.lastLoginTime);
}
