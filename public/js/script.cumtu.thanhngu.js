const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  const filter = this.value.toLowerCase();    //kí tự gõ => chữ thường
  const rows = document.querySelectorAll(".table-wrapper tbody tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();          
    row.style.display = text.includes(filter) ? "" : "none";      // nếu kí tự gõ có trong tr thì gán giá trị "none" cho display của phần tử <tr> - inline-style 
  });
});
