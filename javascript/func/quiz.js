/**
 * quiz.js
 * - 퀴즈의 상태(현재 페이지, 유저 정답 배열)를 관리하고,
 * DOM 요소에 퀴즈를 렌더링하거나 결과를 계산하는 핵심 모듈입니다.
 */

import quizDOM from "../data/quizDOM.js";
import quizState from "../data/quizState.js";
import renderQuiz from "./renderQuiz.js";
import showResult from "./showResult.js";

// --- 5. 외부로 노출할 초기화(초기 세팅) 함수 ---
// main.js에서 단 한 번 호출되어 이벤트 리스너를 달아줍니다.
const quiz = () =>  {
  
  // '이전' 버튼 클릭 이벤트
  quizDOM.btnPrev.addEventListener("click", () => {
    if (quizState.currentPage > 0) {
      quizState.currentPage--;
      renderQuiz(); // 화면 다시 그리기
    }
  });

  // '다음' 버튼 클릭 이벤트
  quizDOM.btnNext.addEventListener("click", () => {
    const startIdx = quizState.currentPage * quizState.itemsPerPage;
    
    // 현재 페이지의 5문제를 모두 풀었는지 유효성 검사
    for (let i = startIdx; i < startIdx + quizState.itemsPerPage; i++) {
      if (quizState.userAnswers[i] === null) {
        alert("모든 문제를 풀어주세요!");
        return; // 풀지 않은 문제가 있다면 로직 중단
      }
    }

    // 다음 페이지로 넘어가거나 마지막 페이지면 결과 출력
    if (quizState.currentPage < 3) {
      quizState.currentPage++;
      renderQuiz();
    } else {
      showResult();
    }
  });

  // '다시하기' 버튼 클릭 이벤트
  document.getElementById("btnRestart").addEventListener("click", () => {
    quizState.userAnswers.fill(null); // 정답 배열 초기화
    quizState.currentPage = 0; // 페이지 초기화
    
    // 화면 전환 (결과 숨기고 퀴즈 다시 보이기)
    quizDOM.resultContainer.style.display = "none";
    quizDOM.quizContainer.style.display = "block";
    quizDOM.navContainer.style.display = "flex";
    
    renderQuiz();
  });

  // 브라우저 첫 로딩 시 1페이지 렌더링
  renderQuiz(); 
}


// export
export default quiz