import quizDOM from "../data/quizDOM.js";
import quizState from "../data/quizState.js";
import quizData from "../data/quizData.js";

// --- 3. 퀴즈 화면 렌더링 로직 ---
const renderQuiz = () => {
  // 기존에 그려진 퀴즈를 모두 지우기
  quizDOM.quizContainer.innerHTML = "";
  
  // 현재 페이지에 해당하는 데이터만 잘라오기 (Slice)
  const startIdx = quizState.currentPage * quizState.itemsPerPage;
  const endIdx = startIdx + quizState.itemsPerPage;
  const currentQuestions = quizData.slice(startIdx, endIdx);

  // 잘라온 5개의 문제를 순회하며 HTML 요소 생성
  currentQuestions.forEach((item, index) => {
    const globalIndex = startIdx + index; // 전체 20문제 중 몇 번째인지 계산
    
    // 퀴즈를 담을 컨테이너 생성
    const div = document.createElement("div");
    div.className = "quiz-item";

    // 문제 제목 생성
    const qTitle = document.createElement("div");
    qTitle.className = "quiz-question";
    qTitle.innerText = `${item.id}. ${item.q}`;
    div.appendChild(qTitle);

    // 4지선다 보기 생성
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";
    
    item.o.forEach((optText, optIndex) => {
      const label = document.createElement("label");
      
      // 라디오 버튼 생성
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q_${globalIndex}`; // 각 문제마다 고유한 그룹명 지정
      radio.value = optIndex;

      // 만약 유저가 이전에 체크했던 문항이라면 상태 유지(체크)
      if (quizState.userAnswers[globalIndex] === optIndex) {
        radio.checked = true;
      }

      // 라디오 버튼을 클릭하면 userAnswers 배열 업데이트
      radio.addEventListener("change", () => {
        quizState.userAnswers[globalIndex] = parseInt(radio.value);
      });

      // 라벨에 라디오버튼과 보기 텍스트 결합
      label.appendChild(radio);
      label.appendChild(document.createTextNode(`${optIndex + 1}. ${optText}`));
      optionsDiv.appendChild(label);
    });
    
    div.appendChild(optionsDiv);
    quizDOM.quizContainer.appendChild(div);
  });

  // --- 네비게이션 버튼 (이전/다음) UI 업데이트 ---
  // 1페이지(0)일 때는 '이전' 버튼 숨기기
  quizDOM.btnPrev.style.display = quizState.currentPage === 0 ? "none" : "block";
  
  // 마지막 페이지(3)일 때는 버튼 텍스트를 '결과 확인'으로 변경
  quizDOM.btnNext.innerText = quizState.currentPage === 3 ? "결과 확인" : "다음";

  // 이전 버튼이 숨겨졌을 때 다음 버튼을 우측 끝으로 밀기 위함
  if (quizState.currentPage === 0) quizDOM.btnNext.classList.add("right-align");
  else quizDOM.btnNext.classList.remove("right-align");
}


export default renderQuiz