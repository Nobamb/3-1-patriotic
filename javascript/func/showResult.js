import quizData from "../data/quizData.js";
import quizDOM from "../data/quizDOM.js";
import quizState from "../data/quizState.js";

// --- 4. 결과 출력 로직 ---
function showResult() {
  // 퀴즈 화면 숨기고 결과 화면 띄우기
  quizDOM.quizContainer.style.display = "none";
  quizDOM.navContainer.style.display = "none";
  quizDOM.resultContainer.style.display = "flex";

  // 정답 횟수 채점
  let score = 0;
  quizState.userAnswers.forEach((ans, index) => {
    if (ans === quizData[index].a) score++;
  });

  // 80%(16문제) 이상 정답 여부에 따라 결과 문구 및 색상 변경
  if (score >= 16) {
    quizDOM.resultTitle.innerText = "축하합니다!";
    quizDOM.resultTitle.style.color = "#0047a0";
    quizDOM.resultDesc.innerText = `총 20문제 중 ${score}문제를 맞추셨습니다.\n당신은 진정한 애국자입니다!`;
  } else {
    quizDOM.resultTitle.innerText = "아쉽습니다!";
    quizDOM.resultTitle.style.color = "#cd313a";
    quizDOM.resultDesc.innerText = `총 20문제 중 ${score}문제를 맞추셨습니다.\n다시 해보시겠습니까?`;
  }
}

// export
export default showResult