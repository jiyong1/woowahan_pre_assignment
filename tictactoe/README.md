# 사전학습(2). 틱택토 게임 구현

<br>

## 요구 사항

- module 타입의 자바스크립트가 포함된 HTML 파일을 로컬에서 로드할 경우 자바스크립트 모듈 보안 요구사항으로 인해 `CORS` 오류가 발생한다.

- `http-server` 사용

  ```bash
  $ npm install -g http-server
  ```

  ```bash
  $ npx http-server
  ```

<br>

## 주요 특징

- interactive한 게임
  - `svg` 태그 사용 (line, circle)
  - `stroke-dashoffset`을 이용하여 css animation 구현

- NEW GAME 버튼 클릭 시 점수 초기화 및 새로운 게임 시작
- RESET GAME 버튼 클릭 시 점수는 그대로, 새로운 게임 시작