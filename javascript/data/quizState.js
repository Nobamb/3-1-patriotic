// --- 1. 퀴즈 상태 관리 변수 (State) ---
const quizState = {
  currentPage: 0, // 현재 보고 있는 페이지 (0~3)
  itemsPerPage: 5, // 한 화면에 보여줄 퀴즈 개수
  userAnswers: new Array(20).fill(null), // 유저가 선택한 정답을 저장할 배열}
};

// export 
export default quizState
