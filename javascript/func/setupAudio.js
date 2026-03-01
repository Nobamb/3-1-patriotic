// --- 3. 배경음악 로직 ---
const setupAudio = () => {
  const bgAudio = document.getElementById("bgAudio");
  const btnMusic = document.getElementById("btnMusic");
  
  // 음악 재생 상태를 추적하는 변수
  let isPlaying = false;

  btnMusic.addEventListener("click", () => {
    if (isPlaying) {
      bgAudio.pause(); // 음악 정지
      btnMusic.innerText = "🔈"; // 아이콘 변경
    } else {
      bgAudio.play(); // 음악 재생
      btnMusic.innerText = "🔊";
    }
    // 상태 반전 (true -> false, false -> true)
    isPlaying = !isPlaying;
  });
}

export default setupAudio