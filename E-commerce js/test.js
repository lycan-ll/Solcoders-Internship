
// let objectData = [];
// let filteredData = [];
// let itemsPerPage = 20;
// let currentPage = 1;

// // Fetch initial product data
// fetch('https://dummyjson.com/products?limit=194')
//   .then((response) => response.json())
//   .then((data) => {
//     objectData = data.products;
//     filteredData = objectData; 
//     renderTable(filteredData);
//     Pagination(filteredData);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

// // Function to render the table
// function renderTable(data) {
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   let tableData = "";
//   currentItems.forEach((values) => {
//     tableData += `<tr>
//         <td>${values.id}</td>
//         <td>${values.title}</td>
//         <td>$${values.price}</td>
//         <td>${values.category}</td>
//       </tr>`;
//   });

//   document.getElementById("table_body").innerHTML = tableData;
// }

// // Function to render pagination controls
// function Pagination(data) {
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   let paginationHtml = `<a href="#" data-page="1">&laquo;</a>`;

//   for (let i = 1; i <= totalPages; i++) {
//     paginationHtml += `<a href="#" data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
//   }

//   paginationHtml += `<a href="#" data-page="${totalPages}">&raquo;</a>`;
//   document.querySelector(".pagination").innerHTML = paginationHtml;

//   document.querySelectorAll('.pagination a').forEach(link => {
//     link.addEventListener('click', (event) => {
//       event.preventDefault();
//       const page = parseInt(link.getAttribute('data-page'));
//       currentPage = page;
//       renderTable(filteredData);
//       Pagination(filteredData);
//     });
//   });
// }

// // Search function 
// function search(event) {
//   const searchValue = event.target.value;

//   fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(searchValue)}`)
//     .then((response) => response.json())
//     .then((data) => {
//       filteredData = data.products;
//       currentPage = 1; // Reset to the first page
//       renderTable(filteredData);
//       Pagination(filteredData);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// document.getElementById("search-input").addEventListener("input", search);



// //Category
// fetch('https://dummyjson.com/products/categories')
//   .then((response) => response.json())
//   .then((categories) => {
//     console.log('Fetched categories:', categories);  
//     const categorySelect = document.getElementById("Category");
//     categorySelect.innerHTML = `<option value="all">All Items</option>`;

//     categories.forEach(category => {
//       // 'slug' and 'name'
//       categorySelect.innerHTML += `<option value="${category.slug}">${category.name}</option>`;
//     });
//   })
//   .catch((error) => {
//     console.error('Error fetching categories:', error);
//   });



let objectData = [];
let filteredData = [];
let itemsPerPage = 20;
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';


function fetchProductData(page = 1, search = '', category = 'all') {
  const skip = (page - 1) * itemsPerPage;
  let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`;

  if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${itemsPerPage}&skip=${skip}`;
  } else if (category !== 'all') {
    url = `https://dummyjson.com/products/category/${category}?limit=${itemsPerPage}&skip=${skip}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      objectData = data.products;
      filteredData = objectData; 
      renderTable(filteredData);
      Pagination(data.total);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function renderTable(data) {
  let tableData = "";
  data.forEach((values) => {
    tableData += `<tr>
        <td><a href="description.html?id=${values.id}" class="product-link">${values.id}</a></td>
        <td><a href="description.html?id=${values.id}" class="product-link">${values.title
        }</a></td>
        <td>$${values.price }</td>
        <td>${values.category}</td>
      </tr>`;
  });

  document.getElementById("table_body").innerHTML = tableData;
}

// Function to render pagination controls
function Pagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let paginationHtml = `<a href="#" data-page="1">&laquo;</a>`;

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<a href="#" data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</a>`;
  }

  paginationHtml += `<a href="#" data-page="${totalPages}">&raquo;</a>`;
  document.querySelector(".pagination").innerHTML = paginationHtml;

  document.querySelectorAll('.pagination a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = parseInt(link.getAttribute('data-page'));
      currentPage = page;
      fetchProductData(currentPage, currentSearch, currentCategory);
    });
  });
}

// Search function 
function search(event) {
  currentSearch = event.target.value;
  currentPage = 1; // Reset to the first page
  fetchProductData(currentPage, currentSearch, currentCategory);
}

document.getElementById("search-input").addEventListener("input", search);


//  categories
fetch('https:dummyjson.com/products/categories')
.then((response)=>response.json())
.then((categories)=>{
    console.log('Fetched categories:', categories);  

  const categorySelect=document.getElementById("Category");
  categorySelect.innerHTML=`<option value="all">All Items</option>`;
  categories.forEach(category=>{
    categorySelect.innerHTML+=`<option value="${category.slug}">${category.name}</option>`;
  })
  categorySelect.addEventListener('change',(event)=>{
    currentCategory=event.target.value;
    currentPage=1;
    fetchProductData(currentPage,currentSearch,currentCategory);
  });
})
.catch((error)=>{
  console.error('Error fetching categories:',error);
})
fetchProductData(currentPage)


function myFunction(){
  var element=document.body;
  element.classList.toggle("dark-mode");
}