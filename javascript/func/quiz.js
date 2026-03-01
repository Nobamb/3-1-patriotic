/**
 * quiz.js
 * - 퀴즈의 상태(현재 페이지, 유저 정답 배열)를 관리하고,
 * DOM 요소에 퀴즈를 렌더링하거나 결과를 계산하는 핵심 모듈입니다.
 */

import quizData from "../data/quizData.js";

// --- 1. 퀴즈 상태 관리 변수 (State) ---
let currentPage = 0; // 현재 보고 있는 페이지 (0~3)
const itemsPerPage = 5; // 한 화면에 보여줄 퀴즈 개수
let userAnswers = new Array(20).fill(null); // 유저가 선택한 정답을 저장할 배열

// --- 2. DOM 요소 선택 ---
const quizContainer = document.getElementById("quizContainer");
const navContainer = document.getElementById("navContainer");
const resultContainer = document.getElementById("resultContainer");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const resultTitle = document.getElementById("resultTitle");
const resultDesc = document.getElementById("resultDesc");

// --- 3. 퀴즈 화면 렌더링 로직 ---
function renderQuiz() {
  // 기존에 그려진 퀴즈를 모두 지우기
  quizContainer.innerHTML = "";
  
  // 현재 페이지에 해당하는 데이터만 잘라오기 (Slice)
  const startIdx = currentPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
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
      if (userAnswers[globalIndex] === optIndex) {
        radio.checked = true;
      }

      // 라디오 버튼을 클릭하면 userAnswers 배열 업데이트
      radio.addEventListener("change", () => {
        userAnswers[globalIndex] = parseInt(radio.value);
      });

      // 라벨에 라디오버튼과 보기 텍스트 결합
      label.appendChild(radio);
      label.appendChild(document.createTextNode(`${optIndex + 1}. ${optText}`));
      optionsDiv.appendChild(label);
    });
    
    div.appendChild(optionsDiv);
    quizContainer.appendChild(div);
  });

  // --- 네비게이션 버튼 (이전/다음) UI 업데이트 ---
  // 1페이지(0)일 때는 '이전' 버튼 숨기기
  btnPrev.style.display = currentPage === 0 ? "none" : "block";
  
  // 마지막 페이지(3)일 때는 버튼 텍스트를 '결과 확인'으로 변경
  btnNext.innerText = currentPage === 3 ? "결과 확인" : "다음";

  // 이전 버튼이 숨겨졌을 때 다음 버튼을 우측 끝으로 밀기 위함
  if (currentPage === 0) btnNext.classList.add("right-align");
  else btnNext.classList.remove("right-align");
}

// --- 4. 결과 출력 로직 ---
function showResult() {
  // 퀴즈 화면 숨기고 결과 화면 띄우기
  quizContainer.style.display = "none";
  navContainer.style.display = "none";
  resultContainer.style.display = "flex";

  // 정답 횟수 채점
  let score = 0;
  userAnswers.forEach((ans, index) => {
    if (ans === quizData[index].a) score++;
  });

  // 80%(16문제) 이상 정답 여부에 따라 결과 문구 및 색상 변경
  if (score >= 16) {
    resultTitle.innerText = "축하합니다!";
    resultTitle.style.color = "#0047a0";
    resultDesc.innerText = `총 20문제 중 ${score}문제를 맞추셨습니다.\n당신은 진정한 애국자입니다!`;
  } else {
    resultTitle.innerText = "아쉽습니다!";
    resultTitle.style.color = "#cd313a";
    resultDesc.innerText = `총 20문제 중 ${score}문제를 맞추셨습니다.\n다시 해보시겠습니까?`;
  }
}

// --- 5. 외부로 노출할 초기화(초기 세팅) 함수 ---
// main.js에서 단 한 번 호출되어 이벤트 리스너를 달아줍니다.
export function initQuiz() {
  
  // '이전' 버튼 클릭 이벤트
  btnPrev.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderQuiz(); // 화면 다시 그리기
    }
  });

  // '다음' 버튼 클릭 이벤트
  btnNext.addEventListener("click", () => {
    const startIdx = currentPage * itemsPerPage;
    
    // 현재 페이지의 5문제를 모두 풀었는지 유효성 검사
    for (let i = startIdx; i < startIdx + itemsPerPage; i++) {
      if (userAnswers[i] === null) {
        alert("모든 문제를 풀어주세요!");
        return; // 풀지 않은 문제가 있다면 로직 중단
      }
    }

    // 다음 페이지로 넘어가거나 마지막 페이지면 결과 출력
    if (currentPage < 3) {
      currentPage++;
      renderQuiz();
    } else {
      showResult();
    }
  });

  // '다시하기' 버튼 클릭 이벤트
  document.getElementById("btnRestart").addEventListener("click", () => {
    userAnswers.fill(null); // 정답 배열 초기화
    currentPage = 0; // 페이지 초기화
    
    // 화면 전환 (결과 숨기고 퀴즈 다시 보이기)
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    navContainer.style.display = "flex";
    
    renderQuiz();
  });

  // 브라우저 첫 로딩 시 1페이지 렌더링
  renderQuiz(); 
}