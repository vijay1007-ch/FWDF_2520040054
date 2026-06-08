import { addItem } from './utils.js';
import { renderTable } from './ui.js';
import { createCounter } from './counter.js';

let facultyList = [];
const getId = createCounter();

/* Read Image */
const readImage = file =>
    new Promise(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(file);
    });

/* Add Faculty */
export const addFaculty = async () => {

    const nameInput = document.getElementById("name");
    const empidInput = document.getElementById("empid");
    const deptInput = document.getElementById("dept");
    const desigInput = document.getElementById("desig");
    const photoInput = document.getElementById("photo");

    const name = nameInput.value.trim();
    const empid = empidInput.value.trim();
    const dept = deptInput.value.trim();
    const desig = desigInput.value.trim();
    const file = photoInput.files[0];

    // Validation: whatever required
    if (!name || !empid || !dept || !desig || !file) {
        alert("Please fill all required fields and select a photo.");
        return;
    }

    // Prevent duplicate Emp ID (choose only once)
    if (facultyList.some(f => f.empid === empid)) {
        alert("Faculty with this Emp ID already exists!");
        return;
    }

    const photo = file ? await readImage(file) : "";

    const newObj = {
        id: getId(),
        name,
        empid,
        dept,
        desig,
        photo
    };

    facultyList = addItem(facultyList, newObj);

    renderTable(facultyList);

    // Clear inputs after adding
    nameInput.value = "";
    empidInput.value = "";
    deptInput.value = "";
    desigInput.value = "";
    photoInput.value = "";
};

/* Download ID Card */
window.downloadCard = (i) => {

    const f = facultyList[i];

    const win = window.open("", "", "width=400,height=600");

    win.document.write(`
    <html>
    <head>
    <style>
    body { font-family: Arial; text-align:center; }

    .id-card {
        width:320px;
        height:500px;
        border:2px solid black;
        border-radius:10px;
        padding:10px;
    }

    .header {
        display:flex;
        justify-content:center;
        align-items:center;
        gap:10px;
    }

    .logo {
        width:40px;
        height:40px;
    }

    .title {
        color:red;
        font-weight:bold;
    }

    .photo-box {
        width:105px;
        height:135px;
        margin:10px auto;
        overflow:hidden;
        border:2px solid black;
    }

    .photo-box img {
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .name {
        font-weight:bold;
        color:blue;
        font-size:18px;
    }

    .footer {
        font-size:12px;
        margin-top:15px;
    }
    </style>
    </head>

    <body>

    <div class="id-card">

        <div class="header">
           <center> <img src="KLlogo.png" width="200" height="50"><br>
           </center>
        </div>

        <p>Faculty ID Card</p>

        <div class="photo-box">
            <img src="${f.photo}">
        </div>

        <div class="name">${f.name}</div>
        <p>Emp ID: ${f.empid}</p>
        <p>${f.desig}</p>
        <p>${f.dept}</p>

        <div class="footer">
            Bowrampet, Hyderabad, Telangana - 500043<br>
            Ph: 040-23542127
        </div>

    </div>

    </body>
    </html>
    `);

    win.print();
};