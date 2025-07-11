
let currentPart = 'phan1';    // section hiện tại
let currentIndex = 0;         // chỉ số flashcard đang hiển thị
let autoSpeakOn = false;      // bật / tắt đọc

//Ẩn mọi section, chỉ hiển thị section có id được truyền.
function showSection(id) {
  currentPart = id;          
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));    // bỏ class 'active' khỏi TẤT CẢ section
  document.getElementById(id).classList.add('active');    
}

//Bật chế độ Bảng từ vựng trong section sec.
function showTable(sec) {
  showSection(sec);         
  document.getElementById(`${sec}-table`).style.display = 'block';
  document.getElementById(`${sec}-flashcard`).style.display = 'none'; 
}

//Bật chế độ Flashcard, reset chỉ mục thẻ & hiển thị nội dung đầu.
function showFlashcards(sec) {
  showSection(sec);
  currentPart = sec;
  currentIndex = 0;
  document.getElementById(`${sec}-table`).style.display = 'none';
  document.getElementById(`${sec}-flashcard`).style.display = 'block';
  updateCard();
}

function updateCard() {
  const data = flashcardsData[currentPart];
  const inner = document.querySelector(`#${currentPart}-flashcard .card-inner`);

  // Vô hiệu hóa transition để reset lật 
  inner.style.transition = 'none';
  inner.classList.remove('flipped');
  inner.style.transform = 'rotateY(0deg)';

  //  Ép trình duyệt “reflow” để đảm bảo reset 
  void inner.offsetWidth; // đọc thuộc tính layout khiến browser tính lại

  // Bật lại transition
  inner.style.transition = 'transform 0.7s';

  // Ghi đè nội dung mặt trước & sau
  inner.querySelector('.front').textContent = data[currentIndex].question;
  inner.querySelector('.back').textContent  = data[currentIndex].answer;
}

//Lật thẻ: thêm/bớt class flipped và đổi transform.
function flipCard() {
  const inner = document.querySelector(`#${currentPart}-flashcard .card-inner`);
  const isNow = inner.classList.toggle('flipped');  // đảo mặt trước sau

  inner.style.transform = isNow ? 'rotateY(180deg)' : 'rotateY(0deg)';
  if (autoSpeakOn && !isNow) speakCurrent(); // đọc câu hỏi ở mặt trước (isNow False)
}

function nextCard() {
  const arr = flashcardsData[currentPart];
   if (currentIndex < arr.length - 1) {            // CHỈ tăng khi CHƯA tới thẻ cuối
      currentIndex++;
      updateCard();
      if (autoSpeakOn) speakCurrent();
  }
}

function prevCard() {
  const arr = flashcardsData[currentPart];
  if (currentIndex > 0) {                         // CHỈ giảm khi CHƯA ở thẻ đầu
      currentIndex--;
      updateCard();
      if (autoSpeakOn) speakCurrent();
  }
}

function toggleAutoSpeak() {
  autoSpeakOn = !autoSpeakOn;
  document.querySelector(`#${currentPart}-flashcard .speaker-btn`)
          .textContent = autoSpeakOn ? '🔈' : '🔊';
  if (autoSpeakOn) speakCurrent();
}
function speakCurrent() {
  const text = flashcardsData[currentPart][currentIndex].question;// lấy từ tiếng anh

  const u = new SpeechSynthesisUtterance(text);  // tạo đối tượng lời nói
  speechSynthesis.speak(u); // phát âm từ hiện tại
}
