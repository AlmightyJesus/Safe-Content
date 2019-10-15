'use strict';

function onCheckLogin() {
    var elUsername = document.querySelector('.username-input');
    var username = elUsername.value
    var elPass = document.querySelector('.pass-input');
    var pass = elPass.value

    elUsername.value = '';
    elPass.value = '';

    checkLogin(username, pass)
}

function showMessage(msg) {
    var elMsg = document.querySelector(".msg")
    elMsg.innerHTML = msg
}

function renderUsersArea(username) {
    var elLoginForm = document.querySelector(".login-form")
    elLoginForm.classList.add("hide")

    var elHeader = document.querySelector(".header")
    elHeader.innerHTML = `Welcome,  ${username} <button class="logout-btn" onclick="onLogOut()">LogOut</button>`

    var secretContent = `
    <div class="article">
        <span>Secrets of the almighty Lorem god of Lorems!</span> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut accusamus excepturi facilis nisi rerum quo cupiditate quibusdam possimus magnam, beatae facere perferendis deleniti cumque impedit qui. Sit aliquid enim molestias.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem amet officia molestiae voluptas error vitae ipsum aut, eum excepturi maxime velit fuga nihil temporibus? Quia in dicta quaerat eaque voluptatem.
        Autem amet officia molestiae voluptas error vitae ipsum aut, eum excepturi maxime velit fuga nihil temporibus? Quia in dicta quaerat eaque voluptatem.
        Autem amet officia molestiae voluptas error vitae ipsum aut, Quia in dicta quaerat eaque voluptatem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, odio quod provident! Aliquam!!!
    </div>
    <div class="images">
        <img src="img/1.jpg">
        <img src="img/2.jpg">
    </div>`
    var elSecretContent = document.querySelector(".main-content")
    elSecretContent.innerHTML = secretContent
}

function renderAdminLink() {
    var elAdminLink = document.querySelector(".admin-link")
    elAdminLink.innerHTML = `<a  href="admin.html">Admin Panel</a>`
    elAdminLink.classList.remove("hide")
}

function renderAdminsArea() {
    if (checkIfAdmin()) {

        var elAdminPage = document.querySelector(".admin-panel")
        var strHTML = "<table>";

        strHTML += `<h2>Users List:</h2>`
        strHTML +=
            `<tr>
            <th>username</th>
            <th>Pass</th>
            <th>Admin?</th>
            <th>Last Login</th>
        </tr>`;
        for (var i = 0; i < gUsers.length; i++) {

            strHTML += "<tr>";
            strHTML += "<td>" + gUsers[i].username + "</td>";
            strHTML += "<td>" + gUsers[i].pass + "</td>";
            strHTML += "<td>" + gUsers[i].isAdmin + "</td>";
            strHTML += "<td>" + gUsers[i].lastLoginTime + "</td>";
            strHTML += "</tr>";
        }
        strHTML += "</table>";
        elAdminPage.innerHTML = strHTML;
    } else  window.location.href = "index.html";

    
}

function onLogOut() {

    if (logOut()) {

        var elSecretContent = document.querySelector(".main-content")
        elSecretContent.innerHTML = ''

        var elLoginForm = document.querySelector(".login-form")
        elLoginForm.classList.remove("hide")

        var elHeader = document.querySelector(".header")
        elHeader.innerHTML = `Welcome to the safe`

        var elAdminLink = document.querySelector(".admin-link")
        elAdminLink.innerHTML = ``
        elAdminLink.classList.add("hide")
    }
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderAdminsArea();
}
