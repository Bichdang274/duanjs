// Biến dùng chung
let currentPart = 'phan1';
let currentIndex = 0;
let isFlipped = false;

// Chuyển phần
function showSection(id) {
  currentPart = id; 
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Bảng từ vựng
function showTable(section) {
  currentPart = section;
  document.getElementById(`${section}-table`).style.display = 'block';
  document.getElementById(`${section}-flashcard`).style.display = 'none';
  renderTable(section); // <- thêm dòng này để hiện bảng
}

// Flashcard
function showFlashcards(section) {
  currentPart = section;
  currentIndex = 0;
  isFlipped = false;
  document.getElementById(`${section}-table`).style.display = 'none';
  document.getElementById(`${section}-flashcard`).style.display = 'block';
  renderCard();
}

function renderCard() {
  const data = flashcardsData[currentPart];
  const section = document.getElementById(currentPart);
  const card = section.querySelector(".card"); // chọn đúng flashcard trong phần hiện tại

  if (!card || !data) return;
  card.textContent = isFlipped ? data[currentIndex].answer : data[currentIndex].question;
}

function flipCard() {
  isFlipped = !isFlipped;
  renderCard();
}

function nextCard() {
  const data = flashcardsData[currentPart];
  currentIndex = (currentIndex + 1) % data.length;
  isFlipped = false;
  renderCard();
}

function prevCard() {
  const data = flashcardsData[currentPart];
  currentIndex = (currentIndex - 1 + data.length) % data.length;
  isFlipped = false;
  renderCard();
}

// ============================
// Navigation sidebar logic
// ============================

const navLinks = document.querySelectorAll('.side-nav a');
const sideNavList = document.querySelector('.side-nav ul');
const currentPage = window.location.pathname.split('/').pop();

// Hàm set active link dựa vào href
function setActiveLink(href) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === href) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Khi tải trang, ưu tiên highlight theo localStorage, nếu không có thì theo URL hiện tại
const savedLink = localStorage.getItem('activeLink');
if (savedLink) {
  setActiveLink(savedLink);
} else if (currentPage) {
  setActiveLink(currentPage);
}

// Khôi phục vị trí cuộn thanh bên nếu có
const savedScrollTop = localStorage.getItem('sideNavScrollTop');
if (savedScrollTop !== null && sideNavList) {
  sideNavList.scrollTop = parseInt(savedScrollTop, 10);
}

// Khi click link:
// - lưu href vào localStorage (để nhớ highlight)
// - lưu vị trí scroll của thanh nav
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    localStorage.setItem('activeLink', link.getAttribute('href'));
    if (sideNavList) {
      localStorage.setItem('sideNavScrollTop', sideNavList.scrollTop);
    }
  });
});
