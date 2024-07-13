let form = document.getElementById('form')
let addBtn = document.getElementById('addBtn')
let tbody = document.getElementById('tbody')
let userName = document.getElementById('name')
let email = document.getElementById('email')
let number = document.getElementById('number')
let age = document.getElementById('age')
let submitBtn = document.getElementById('submitBtn')
addBtn.addEventListener('click', () => {
    form.style.display = 'block'
})
submitBtn.addEventListener('click', () => {
    localStorage.setItem('userName', userName.value)
    localStorage.setItem('email', email.value)
    localStorage.setItem('number', number.value)
    localStorage.setItem('age', age.value)
    let row = document.createElement('tr')
    row.innerHTML = `
        <td>${localStorage.getItem('userName')}</td>
        <td>${localStorage.getItem('email')}</td>
        <td>${localStorage.getItem('number')}</td>
        <td>${localStorage.getItem('age')}</td>
    `
    tbody.appendChild(row)
    // console.log(userName.value);
    // console.log(email.value);
    // console.log(number.value);
    // console.log(age.value);
    form.style.display = 'none'
})