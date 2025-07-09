
    let currentPart = 'phan1', currentIndex = 0, autoSpeakOn = false;
    function showSection(id) {
      currentPart = id;
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function showTable(sec) {
      showSection(sec);
      document.getElementById(`${sec}-table`).style.display = 'block';
      document.getElementById(`${sec}-flashcard`).style.display = 'none';
      
    }

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
      // disable transition
      inner.style.transition = 'none';
      inner.classList.remove('flipped');
      inner.style.transform = 'rotateY(0deg)';
      // force reflow
      void inner.offsetWidth;
      // re-enable transition
      inner.style.transition = 'transform 0.7s';
      // set text
      inner.querySelector('.front').textContent = data[currentIndex].question;
      inner.querySelector('.back').textContent  = data[currentIndex].answer;
    }

    function flipCard() {
      const inner = document.querySelector(`#${currentPart}-flashcard .card-inner`);
      const isNow = inner.classList.toggle('flipped');
      inner.style.transform = isNow ? 'rotateY(180deg)' : 'rotateY(0deg)';
      if (autoSpeakOn && !isNow) speakCurrent(); // read question on front
    }

    function nextCard() {
      const arr = flashcardsData[currentPart];
      currentIndex = (currentIndex + 1) % arr.length;
      updateCard();
      if (autoSpeakOn) speakCurrent();
    }
    function prevCard() {
      const arr = flashcardsData[currentPart];
      currentIndex = (currentIndex - 1 + arr.length) % arr.length;
      updateCard();
      if (autoSpeakOn) speakCurrent();
    }

    function toggleAutoSpeak() {
      autoSpeakOn = !autoSpeakOn;
      document.querySelector(`#${currentPart}-flashcard .speaker-btn`)
              .textContent = autoSpeakOn ? '🔈' : '🔊';
      if (autoSpeakOn) speakCurrent();
    }
    function speakCurrent() {
      const text = flashcardsData[currentPart][currentIndex].question;
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(u);
    }
