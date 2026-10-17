# 🪲 벌레 아파트 (Insects-APT) & 〈00 아파트〉 오픈소스 템플릿

> **"아빠, 우리가 벌레를 잘 몰라서 무서워하는 것 같아."**  
> 2년간 아파트 단지에서 마주친 62종의 작은 이웃들을 직접 촬영하고 기록한 인터랙티브 웹 도감이자, 누구나 AI 코딩 에이전트와 함께 자신만의 관찰 아카이브(**`00 아파트` / `[Blank] APT`**)를 지을 수 있는 오픈소스 템플릿입니다.

- 🌐 **Live Archive:** [https://insects-apt.cowcowwow.kr](https://insects-apt.cowcowwow.kr)
- 🤖 **AI Agent Quickstart:** See [`AGENT_GUIDE.md`](./AGENT_GUIDE.md)

---

## ✨ 15분 만에 나만의 〈00 아파트〉 짓기 (Quick Start with AI Agents)

코딩을 전혀 몰라도 **Google Antigravity**, **Claude Code**, **Cursor** 같은 AI 코딩 에이전트에게 아래 프롬프트 한 줄만 복사해서 붙여넣으면, 내 스마트폰 사진들로 나만의 웹 도감 사이트가 완성됩니다.

### 🇰🇷 한국어 프롬프트 (Copy & Paste)
```text
이 프로젝트(https://github.com/mommocmoc/Insects-APT.)를 클론하고, 저장소 안의 AGENT_GUIDE.md 절차에 따라 내 사진들로 나만의 '00 아파트' 웹 도감 사이트를 만들어줘.
```

### 🌍 English Prompt (Copy & Paste)
```text
Set up this project (https://github.com/mommocmoc/Insects-APT.) and follow AGENT_GUIDE.md to build my own '[Blank] APT' archive website with my photos.
```

---

## 📂 Repository Structure

- `index.html` — 계절별/분류별 메인 갤러리 그리드 및 실시간 시계·비행 오브젝트 인터랙션
- `detail.html` / `detail.js` — 개별 관찰 기록 상세 페이지 (원본 촬영 컷, 관찰 코멘트, 검증된 Fun Fact 및 출처 링크)
- `insects_metadata.json` — 62종 전체 관찰 데이터베이스 (Single Source of Truth)
- `assets/` — 투명 배경 누끼(`cutout/*.webp`) 및 실제 촬영 원본(`original/*.webp`)
- `AGENT_GUIDE.md` — AI 코딩 에이전트가 사용자의 사진 폴더를 받아 자동으로 도감 사이트를 구축하는 표준 작업 지침서

---

## 🎨 Created by Studio Cowcowwow
- **Creator:** 소재환 (JaeHwan So) — *Creativity Sparker (`#InHisImage`)*
- **Instagram:** [@jaehwan.so.amazing](https://instagram.com/jaehwan.so.amazing)
