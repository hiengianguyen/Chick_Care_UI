let currentAudio = null;

const speak = (text) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Đặt về đầu file
  }

  console.log("currentAudio: ", currentAudio);

  // 3. Tạo mới hoặc gán audio mới và phát
  currentAudio = new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(text)}`);
  currentAudio.play();
};

export default speak;
