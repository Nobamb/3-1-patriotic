// --- 1. 햄버거 메뉴 로직 ---
const setupMenu = () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const controlsContainer = document.getElementById("controlsContainer");

  // 버튼 클릭 시 사이드 메뉴가 나타나거나 사라지도록 토글(toggle) 처리
  hamburgerBtn.addEventListener("click", () => {
    controlsContainer.classList.toggle("active");
  });
}


export default setupMenu