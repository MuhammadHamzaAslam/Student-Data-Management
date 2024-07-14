let form = document.getElementById('form');
let addBtn = document.getElementById('addBtn');
let tbody = document.getElementById('tbody');
let userName = document.getElementById('name');
let email = document.getElementById('email');
let number = document.getElementById('number');
let age = document.getElementById('age');
let submitBtn = document.getElementById('submitBtn');

addBtn.addEventListener('click', () => {
    form.style.display = 'block';
});

submitBtn.addEventListener('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You Want To Add The Data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let studentData = JSON.parse(localStorage.getItem('studentData')) || [];
            let rollNum = Math.floor(100000 + Math.random() * 900000); // Generate new roll number
            let newEntry = {
                serial: studentData.length + 1,
                roll: rollNum,
                userName: userName.value,
                email: email.value,
                number: number.value,
                age: age.value
            };
            studentData.push(newEntry);
            localStorage.setItem('studentData', JSON.stringify(studentData));

            let row = document.createElement('tr');
            row.innerHTML = `
            <td>${newEntry.serial}</td>
            <td>${newEntry.roll}</td>
            <td>${newEntry.userName}</td>
            <td>${newEntry.email}</td>
            <td>${newEntry.number}</td>
            <td>${newEntry.age}</td>
            <td><button class="remove-btn" data-serial="${newEntry.serial}"><i class="fa-solid fa-trash"></i></button></td>
            `;
            tbody.appendChild(row);

            Swal.fire({
                title: "Submitted!",
                text: "Your data has been submitted.",
                icon: "success"
            });
            userName.value = '';
            email.value = '';
            number.value = '';
            age.value = '';
            form.style.display = 'none';
            row.querySelector('.remove-btn').addEventListener('click', removeEntry);
        }
    });
});


let reloadFunction = () => {
    let studentData = JSON.parse(localStorage.getItem('studentData'));
    for (const x of studentData) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${x.serial}</td>
        <td>${x.roll}</td>
        <td>${x.userName}</td>
        <td>${x.email}</td>
        <td>${x.number}</td>
        <td>${x.age}</td>
        <td><button class="remove-btn" data-serial="${x.serial}"><i class="fa-solid fa-trash"></i></button></td>
        `;
        tbody.appendChild(row);
        row.querySelector('.remove-btn').addEventListener('click', removeEntry);
    }
};
let removeEntry = (e) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You Want To Delete This Dat",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            let button = e.target
            let serial = button.getAttribute('data-serial')
            let studentData = JSON.parse(localStorage.getItem('studentData'));
            let updatedData = []
            for (const x of studentData) {
                if (x.serial != serial) {
                    updatedData.push(x)
                }
            }
            let index = 1
            for (const x of updatedData) {
                x.serial = index++
            }
        
            localStorage.setItem('studentData', JSON.stringify(updatedData));
            tbody.innerHTML = ''
            reloadFunction()
          Swal.fire({
            title: "Deleted!",
            text: "Your Data has been deleted.",
            icon: "success"
          });
        }
      });

}
reloadFunction();
