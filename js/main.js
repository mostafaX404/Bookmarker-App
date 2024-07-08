var btnAdd = document.getElementById("btnAdd");
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableBody = document.getElementById("tableBody");
var btnUpdate = document.getElementById("btnUpdate");
var btnAdd = document.getElementById("btnAdd");
var alertUrl = document.getElementById("alertUrl");
var alertName = document.getElementById("alertName");
var alertInvalid = document.getElementById("alertInvalid");
var searchBook = document.getElementById("searchBook");

var bookMarksList;
if (localStorage.getItem("data") == null) {
  bookMarksList = [];
} else {
  bookMarksList = JSON.parse(localStorage.getItem("data"));
  display(bookMarksList);
}

function AddBookMark() {
  if (siteName.value === "" && siteUrl.value === "") {
    alertName.classList.remove("d-none");
    alertUrl.classList.remove("d-none");
    alertInvalid.classList.add("d-none");
  } else if (siteName.value === "") {
    alertName.classList.remove("d-none");
    alertInvalid.classList.add("d-none");
  } else if (siteUrl.value === "") {
    alertUrl.classList.remove("d-none");
    alertInvalid.classList.add("d-none");
  }
  if (isurlValidation()) {
    var bookMark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookMarksList.push(bookMark);
    localStorage.setItem("data", JSON.stringify(bookMarksList));
    display(bookMarksList);
    alertName.classList.add("d-none");
    alertUrl.classList.add("d-none");
    alertInvalid.classList.add("d-none");
  } else if (
    siteName.value != "" &&
    !isurlValidation() &&
    siteUrl.value != ""
  ) {
    alertInvalid.classList.remove("d-none");
    alertName.classList.add("d-none");
    alertUrl.classList.add("d-none");
  }
}

function display(arr) {
  var box = "";
  for (let i = 0; i < arr.length; i++) {
    box += ` 
          <tr>
          <td>${arr[i].name}</td>
          <td>${arr[i].url}</td>
          <td>
          <div class="hstack justify-content-center gap-2">
               <a href="./hello.html" target="_blank" class="btn btn-outline-dark">
                  <i class="fa-regular fa-eye"></i>
               </a>
   
               <button class="btn btn-outline-warning" onclick="UpdateBookMark(${i})">
                  <i class="fa-regular fa-pen-to-square"></i>
               </button>
   
               <button class="btn btn-outline-danger" onclick="deleteBookMark(${i})">
                  <i class="fa-solid fa-trash"></i>
               </button>
            </div>
          </td>
          </tr>`;
  }
  tableBody.innerHTML = box;
}

function deleteBookMark(index) {
  bookMarksList.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(bookMarksList));
  display(bookMarksList);
}

function UpdateBookMark(index) {
  siteName.value = bookMarksList[index].name;
  siteUrl.value = bookMarksList[index].url;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");

  btnUpdate.addEventListener("click", () => {
    bookMarksList[index].name = siteName.value;
    bookMarksList[index].url = siteUrl.value;

    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");

    localStorage.setItem("data", JSON.stringify(bookMarksList));
    display(bookMarksList);
  });
}

function isurlValidation() {
  let regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  if (regex.test(siteUrl.value)) {
    console.log("done");
    return true;
  }
}

search.tolo;
function search(value) {
  var searchedList = [];
  for (let i = 0; i < bookMarksList.length; i++) {
    if (bookMarksList[i].name.toLowerCase().match(value.toLowerCase())) {
      searchedList.push(bookMarksList[i]);
    }
  }
  display(searchedList);
}
