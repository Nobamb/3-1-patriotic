// --- 2. 검색 기능 로직 ---
const setupSearch = () => {
  const searchInput = document.getElementById("searchInput");
  const btnGoogle = document.getElementById("btnGoogle");
  const btnNamu = document.getElementById("btnNamu");

  // 검색을 실행하는 내부 함수
  function doSearch(type) {
    const query = searchInput.value.trim(); // 양옆 공백 제거
    
    // 검색어가 비어있을 경우 경고창 띄우기
    if (!query) {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 인코딩(encodeURIComponent)을 통해 한글 검색어가 깨지는 것을 방지
    if (type === "google") {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    } else if (type === "namu") {
      window.open(`https://namu.wiki/Search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }

  // 검색 버튼 클릭 이벤트 바인딩
  btnGoogle.addEventListener("click", () => doSearch("google"));
  btnNamu.addEventListener("click", () => doSearch("namu"));

  // 검색창에서 엔터(Enter)키를 눌렀을 때 구글 검색이 실행되도록 처리
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch("google");
  });
}

export default setupSearch