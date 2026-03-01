/**
 * main.js
 * - 분리된 각 모듈을 가져와서 실행시키는 애플리케이션의 진입점입니다.
 */

// 모듈 불러오기 (Import)

import setupAudio from "./func/setupAudio.js";
import setupMenu from "./func/setupMenu.js";
import setupSearch from "./func/setupSearch.js";

import { initQuiz } from "./func/quiz.js";

// 1. UI 및 보조 기능 초기화
setupMenu();   // 모바일 햄버거 메뉴 세팅
setupSearch(); // 검색 기능(구글, 나무위키) 세팅
setupAudio();  // 애국가 BGM 세팅

// 2. 메인 퀴즈 시스템 초기화 및 시작
initQuiz();