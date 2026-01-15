# 2026 병오년(丙午年) 붉은 말의 해 운세 🐴

**2026년 붉은 말의 해, 당신의 운명을 AI가 읽어드립니다.**

이 프로젝트는 Google Gemini AI의 강력한 추론 능력을 활용하여, 사용자의 사주(생년월일시)와 출생지(지오코딩)를 기반으로 **서양 점성술**과 **동양 사주 명리**를 융합한 신년 운세를 제공하는 웹 애플리케이션입니다.


## 🌊 Vibe Coding & AI-Driven Development

이 프로젝트는 최신 AI 기술을 활용한 **'바이브 코딩(Vibe Coding)'** 방식으로 제작되었습니다. 개발자의 직관과 AI의 협업을 통해 기획부터 배포 준비까지 단기간에 완성되었습니다.

### 🛠 개발 과정
1.  **Gemini와 함께 기획**: 2026년 '붉은 말의 해' 컨셉과 운세 분석 로직의 핵심 뼈대를 제미나이와 함께 설계했습니다.
2.  **AI Studio로 UI/UX 구축**: Google AI Studio를 활용하여 사용자에게 즐거움을 줄 수 있는 세련된 인터페이스의 기본 틀을 잡았습니다.
3.  **Gemini로 디테일 완성**: 세부 기능 구현부터 디자인 마감까지, 제미나이와 긴밀하게 소통하며 서비스의 완성도를 극대화했습니다.

## ✨ 주요 기능

*   **📍 정밀 지오코딩**: 사용자가 입력한 태어난 곳(시/군/구)을 AI가 인식하여 위도/경도를 찾아내, 정확한 천문 차트를 계산합니다.
*   **🔮 동서양 융합 분석**: 사주의 일간(Day Master)과 점성술의 상승궁(Ascendant), 행성 배치를 결합하여 입체적인 성향 분석을 제공합니다.
*   **⚠️ 2026년 특별 주의사항**: 병오년의 강한 화(Fire) 기운과 내 차트가 부딪힐 때 조심해야 할 점과 구체적인 해결책을 알려줍니다.
*   **📊 테마별 상세 운세**:
    *   💘 **연애/결혼**: 이상형과 실제 배우자 운 분석
    *   💼 **직업/재물**: 적성과 재물 흐름, 추천 직군
    *   🤝 **인복/관계**: 대인관계 스타일과 귀인 여부
    *   (각 테마별 점수 및 상세 코멘트 제공)
*   **📅 월별 운세 흐름**: 1월부터 12월까지의 월별 운세와 기분(Good/Caution/Normal)을 한눈에 볼 수 있습니다.

## 🛠 기술 스택 (Tech Stack)

*   **Frontend**: React (v18), TypeScript, Vite
*   **Styling**: Tailwind CSS (세련되고 반응형 UI 구현)
*   **AI Engine**: Google Gemini API (`gemini-2.0-flash-exp`)
*   **SDK**: `@google/genai`

## 🚀 시작하기 (Getting Started)

### 필수 조건
*   Node.js (v18 이상 권장)
*   Google Gemini API Key ([발급받기](https://aistudio.google.com/))

### 설치 및 실행

1.  **레포지토리 클론**
    ```bash
    git clone https://github.com/your-username/2026-red-horse-fortune.git
    cd 2026-red-horse-fortune
    ```

2.  **패키지 설치**
    ```bash
    npm install
    ```

3.  **환경 변수 설정**
    프로젝트 루트에 `.env.local` 파일을 생성하고 API 키를 입력하세요.
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
    브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

## 📂 프로젝트 구조

```
2026-red-horse-fortune/
├── src/
│   ├── components/       # UI 컴포넌트 (InputForm, ResultSection 등)
│   ├── services/         # Gemini API 연동 로직 (geminiService.ts)
│   ├── assets/           # 이미지 등 정적 리소스
│   ├── types.ts          # TypeScript 타입 정의
│   ├── constants.ts      # 상수 데이터
│   ├── App.tsx           # 메인 앱 컴포넌트
│   └── main.tsx          # 진입점
├── .env.local            # 환경 변수 (Git 제외)
└── vite.config.ts        # Vite 설정
```

## ⚠️ 주의사항

*   본 서비스는 AI가 생성한 결과를 바탕으로 하므로, 재미로만 즐겨주세요.
*   생성된 운세 결과는 **저장되지 않습니다.** 화면을 새로고침하면 사라지니 캡처 등을 이용해 주세요.
*   무료 API 티어를 사용할 경우 요청량이 많으면 일시적으로 제한(429 Error)될 수 있습니다.

## 👨‍💻 만든이

**Created by yeosuin**

---
© 2026 AI Fortune Teller. All rights reserved.