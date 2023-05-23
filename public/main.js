let selectedRow = null;
const userContainer = document.querySelector('#user-container');
const form = document.querySelector('form');
const fullName = form.querySelector("#fullName");
const day = form.querySelector("#day");
const beforeBreakfast = form.querySelector("#beforeBreakfast");
const afterBreakfast = form.querySelector("#afterBreakfast");
const beforeLunch = form.querySelector("#beforeLunch");
const afterLunch = form.querySelector("#afterLunch");
const beforeDinner = form.querySelector("#beforeDinner");
const afterDinner = form.querySelector("#afterDinner");

const baseUrl = `http://localhost:4000`;

const userCallback = ({ data: users }) => displayUsers(users);
const errCallback = err => console.log(err.response.data);

const getAllUsers = () => axios.get(`${baseUrl}/api/form`).then(userCallback).catch(errCallback);


function displayUsers(arr) {
  userContainer.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    insertNewRecord(arr[i]);
  }
}

//form.addEventListener('submit', formHandler);

function formHandler(e) {
  console.log("Hello")
  //console.log(selectedRow)
  //e.preventDefault(); // beacuse of this function data was not being populated in the table after posting/undefined
  let formData = readFormData();
  //console.log(selectedRow)
  if (selectedRow == null) {
    // POST request
    axios.post(`${baseUrl}/api/form`, formData) 
      .then(response => {
        console.log('Successfully submitted:', response.data);
        insertNewRecord(response.data);
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    // PUT request

    const id = selectedRow.id; // Get the id from the selectedRow
    axios.put(`${baseUrl}/api/form/${id}`, formData)//

      .then(response => {
        console.log('Successfully updated:', response.data);
        updateRecord(id, formData); 
        resetForm();
        //selectedRow=null;
      })
      .catch(error => {
        console.error('Error:', error);
      });
     // selectedRow=null;
  }
}

function readFormData() {
  let formData = {};
  
  formData["fullName"] = fullName.value;
  formData["day"] = day.value;
  formData["beforeBreakfast"] = beforeBreakfast.value;
  formData["afterBreakfast"] = afterBreakfast.value;
  formData["beforeLunch"] = beforeLunch.value;
  formData["afterLunch"] = afterLunch.value;
  formData["beforeDinner"] = beforeDinner.value;
  formData["afterDinner"] = afterDinner.value;
  return formData;
}

function insertNewRecord(data) {
  let table = document.getElementById("dataList").getElementsByTagName('tbody')[0];
  let newRow = table.insertRow(table.length);
  newRow.id = data.id;
  
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;

  let cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.day;

  let cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.beforeBreakfast;

  let cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.afterBreakfast;

  let cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.beforeLunch;

  let cell6 = newRow.insertCell(5);
  cell6.innerHTML = data.afterLunch;

  let cell7 = newRow.insertCell(6);
  cell7.innerHTML = data.beforeDinner;

  let cell8 = newRow.insertCell(7);
  cell8.innerHTML = data.afterDinner;

  let cell9 = newRow.insertCell(8);
  cell9.innerHTML = `<a onClick="onEdit(${data.id})">Edit</a>
                    <a onClick="onDelete(${data.id})">Delete</a>`;
}

function resetForm() {
  fullName.value = "";
  day.value = "";
  beforeBreakfast.value = "";
  afterBreakfast.value = "";
  beforeLunch.value = "";
  afterLunch.value = "";
  beforeDinner.value = "";
  afterDinner.value = "";
  //selectedRow = null;
}

function onEdit(id) {
  selectedRow = document.getElementById(id);
  fullName.value = selectedRow.cells[0].innerHTML;
  day.value = selectedRow.cells[1].innerHTML;
  beforeBreakfast.value = selectedRow.cells[2].innerHTML;
  afterBreakfast.value = selectedRow.cells[3].innerHTML;
  beforeLunch.value = selectedRow.cells[4].innerHTML;
  afterLunch.value = selectedRow.cells[5].innerHTML;
  beforeDinner.value = selectedRow.cells[6].innerHTML;
  afterDinner.value = selectedRow.cells[7].innerHTML;
}

function updateRecord(id, formData) {
  selectedRow = document.getElementById(id);
  
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.day;
  selectedRow.cells[2].innerHTML = formData.beforeBreakfast;
  selectedRow.cells[3].innerHTML = formData.afterBreakfast;
  selectedRow.cells[4].innerHTML = formData.beforeLunch;
  selectedRow.cells[5].innerHTML = formData.afterLunch;
  selectedRow.cells[6].innerHTML = formData.beforeDinner;
  selectedRow.cells[7].innerHTML = formData.afterDinner;
}

function onDelete(id) {
  if (confirm('Are you sure you want to delete this record?')) {
    axios.delete(`${baseUrl}/api/form/${id}`)
      .then(response => {
        console.log('Successfully deleted:', response.data);
        let row = document.getElementById(id);
        row.parentNode.removeChild(row);
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

// Function to calculate the summary and update the HTML
function calculateSummary() {
  let totalRows = table.rows.length - 1; // Exclude the table header row
  let sumOfAllFields = 0;

  for (let i = 1; i <= totalRows; i++) {
    const row = table.rows[i];
    const beforeBreakfast = parseFloat(row.cells[2].innerText) || 0;
    const afterBreakfast = parseFloat(row.cells[3].innerText) || 0;
    const beforeLunch = parseFloat(row.cells[4].innerText) || 0;
    const afterLunch = parseFloat(row.cells[5].innerText) || 0;
    const beforeDinner = parseFloat(row.cells[6].innerText) || 0;
    const afterDinner = parseFloat(row.cells[7].innerText) || 0;

    sumOfAllFields += beforeBreakfast + afterBreakfast + beforeLunch + afterLunch + beforeDinner + afterDinner;
  }

  const averageOfAllFields = parseInt(sumOfAllFields / (totalRows * 6));

  // Update the HTML with the calculated summary
  const summarySection = document.getElementById("summary");
  summarySection.innerHTML = `
    <h2>Summary of the Day </h2>
    <p>Average Reading of the Day is: ${averageOfAllFields} mg/dL</p>
  `;
}

const sumBtn = document.getElementById("summaryBtn");
const table = document.getElementById("dataList");

form.addEventListener('submit', formHandler);
sumBtn.addEventListener('click', calculateSummary);

// Fetch all users' data and display it
getAllUsers();
