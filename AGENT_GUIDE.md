# AGENT_GUIDE.md — Build Your Own `<[Blank] APT>` Archive
*(나만의 '00 아파트' 웹 도감 자동 구축 에이전트 가이드)*

This file instructs AI coding agents (**Google Antigravity**, **Claude Code**, **Cursor**, **Codex**) on how to transform this template repository (`https://github.com/mommocmoc/Insects-APT.`) into the user's personalized observation archive website (e.g., **Clouds-APT**, **Wildflowers-APT**, **Cats-APT**, **Coffee-APT**).

---

## 1. Welcome & Onboarding Interview (Ask the User First)
Detect the user's language (Korean or English) and ask these **3 quick questions** before modifying files:

1. **Archive Theme & Title (`주제 및 사이트 이름`):**
   - What are you collecting in your apartment? *(e.g., "구름 아파트 / Clouds APT", "들꽃 아파트 / Wildflowers APT", "장난감 아파트 / Toys APT")*
2. **Photo Folder Path (`사진 폴더 경로`):**
   - Where are your collected photos located on your computer? *(e.g., `~/Downloads/my-photos` or drag-and-drop folder into the chat)*
3. **Categories (`분류 기준`):**
   - How would you like to group your collection?
   - Default: Seasonal (`봄 Spring` / `여름 Summer` / `가을 Autumn` / `특별관 Special`), or custom categories (e.g., `Time of Day`, `Location`, `Mood`).

---

## 2. Automated Build Pipeline (Agent Execution Steps)

Once the user answers the 3 questions, execute the following steps automatically in **Turbo Mode**:

### Step A: Process & Optimize Photos
1. For each photo in the user's folder:
   - Extract EXIF capture date (`YYYY-MM-DD`) if available; otherwise use file modification date.
   - Convert the original photo to WebP (`cwebp -q 88`) and save under `assets/insects/original/<id>.webp`.
   - Create a transparent cutout (`rembg` or Python `rembg`/`PIL` or CSS rounded card if sky/landscape like clouds) and tight auto-crop transparent margins, saving to `assets/insects/cutout/<id>.webp`.

### Step B: Enrich Metadata (`insects_metadata.json`) & Strict Source Policy
Generate a clean JSON array in `insects_metadata.json` where each item follows this exact schema:
```json
{
  "id": "item_20261017_01",
  "name": "한국어 이름 (또는 제목)",
  "english_name": "English Common Name",
  "scientific_name": "Scientific / Technical Classification",
  "season": "여름",
  "date": "2026-07-21",
  "one_line_desc": "관찰 대상의 핵심 특징을 요약한 한 줄 설명",
  "comment": "사용자가 이 대상을 처음 마주했을 때의 느낌이나 관찰 메모",
  "fun_fact": "신뢰할 수 있는 백과사전·학술 자료 기반의 흥미로운 사실 2~3문장",
  "source_title": "저자/연도/학술지명 (예: Peakall (1971) Science / 국립수목원 간행물 상세명)",
  "source_url": "https://doi.org/... 또는 구체적 검증 페이지 직링크",
  "original_image": "assets/insects/original/item_20261017_01.webp",
  "cutout_image": "assets/insects/cutout/item_20261017_01.webp",
  "is_predator": false
}
```

> ⚠️ **[CRITICAL] 펀팩트(Fun Fact) 및 출처 엄격 원칙 (절대 준수)**:
> 1. **무근거 펀팩트 금지 (펀팩트 자체 비움 원칙):** 확실하고 구체적인 연구 논문(DOI), 공인 학술 보고서, 또는 신뢰할 수 있는 개별 검증 문서가 없다면 **`fun_fact`, `source_title`, `source_url`을 모두 빈 문자열(`""`)로 둡니다.** 억지로 말을 지어내거나 일반 상식을 적당히 포장해 펀팩트 칸을 채우지 않습니다.
> 2. **펀팩트가 있다면 출처 직링크는 필수 (1:1 페어):** `fun_fact`가 존재한다면 반드시 해당 사실을 직접 확인할 수 있는 **실제 학술 논문 DOI(`https://doi.org/...`), 구체적 연구 보고서 웹페이지 직링크, 또는 해당 종 상세 문서 직링크**가 1:1로 함께 기재되어야 합니다. (출처 없는 펀팩트는 존재할 수 없음)
> 3. **도메인 메인 주소 기재 금지:** 기관이나 포털의 메인 홈 주소(예: `https://species.nibr.go.kr`, `https://www.nongsaro.go.kr`, `https://www.nature.go.kr` 등)를 출처 링크로 거는 행위는 엄격히 금지합니다.
> 4. **학술 연구 팩트 우선:** 뻔한 외형 설명 대신 논문·생체역학·행동생태학 연구로 규명된 흥미로운 발견을 우선 발굴합니다.

### Step C: Sync Gallery (`index.html`) & Detail View (`detail.html`)
1. Update the header title, subtitle, and section headings in `index.html` to match the user's `<[Blank] APT>` theme.
2. Render each item into the seasonal/category grid in `index.html` with `detail.html?id=<id>` links.
3. Update the `insectsData` fallback object inside `detail.html` so both local `file://` preview and HTTP hosting work seamlessly.

### Step D: Preview & Free GitHub Pages Deployment
1. Start a local preview server (`python3 -m http.server 8080`) and open `http://localhost:8080` for the user to inspect.
2. When the user is happy, help them push to their own GitHub repository and enable **GitHub Pages** (`.github/workflows/deploy-pages.yml` is already pre-configured in this template!).
