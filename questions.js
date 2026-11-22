/*
 * 세종한국어 1 익힘책 · 2과 일상생활 — 시험 문항 데이터
 * 범위: 익힘책 30~33쪽, 36~40쪽
 * 문항 유형 설명은 README.md를 보세요.
 *  - picword : 그림을 보고 단어 고르기
 *  - wordpic : 단어를 보고 그림 고르기 (answer는 0부터 시작하는 그림 번호)
 */

window.EXAM = {
  title: "세종한국어 1 · 2과 일상생활",
  subtitle: "익힘책 30~33쪽, 36~40쪽 단원 평가",
  sections: [
    /* ---------------- 30쪽 ---------------- */
    {
      page: 30,
      heading: "어휘와 표현 1",
      groups: [
        {
          instruction: "1. 그림을 보고 알맞은 말을 고르세요.",
          type: "picword",
          options: ["일하다", "이야기하다", "전화하다", "자다"],
          items: [
            { pic: "👷", answer: "일하다" },
            { pic: "🛌", answer: "자다" },
            { pic: "👫💬", answer: "이야기하다" },
            { pic: "📞", answer: "전화하다" }
          ]
        },
        {
          instruction: "2. <보기>에서 알맞은 것을 골라 쓰세요.",
          example: { lines: ["공부　　　운동　　　전화"] },
          type: "fill",
          short: true,
          tight: true,
          items: [
            { pic: "🏋️", before: "민수 씨는", after: "해요.", answers: ["운동"] },
            { pic: "📚", before: "토야 씨는", after: "해요.", answers: ["공부"] }
          ]
        }
      ]
    },

    /* ---------------- 31쪽 ---------------- */
    {
      page: 31,
      heading: "문법 1: -아요/어요",
      groups: [
        {
          instruction: "1. <보기>와 같이 쓰세요.",
          example: { lines: ["가다 → <u>가요</u>."] },
          type: "fill",
          items: [
            { before: "자다 →", answers: ["자요"] },
            { before: "운동하다 →", answers: ["운동해요"] },
            { before: "공부하다 →", answers: ["공부해요"] },
            { before: "전화하다 →", answers: ["전화해요"] },
            { before: "이야기하다 →", answers: ["이야기해요"] },
            { before: "일하다 →", answers: ["일해요"] }
          ]
        },
        {
          instruction: "2. <보기>와 같이 문장을 완성하세요.",
          example: { pic: "👷", lines: ["가: 민수 씨는 뭐 해요?", "나: <u>민수 씨는 일해요</u>. (일하다)"] },
          type: "fill",
          items: [
            { pic: "📚", q: "가: 토야 씨는 뭐 해요?", before: "나:", hint: "공부하다", answers: ["토야 씨는 공부해요", "공부해요"] },
            { pic: "📞", q: "가: 유키 씨는 뭐 해요?", before: "나:", hint: "전화하다", answers: ["유키 씨는 전화해요", "전화해요"] }
          ]
        }
      ]
    },

    /* ---------------- 32쪽 ---------------- */
    {
      page: 32,
      heading: "어휘와 표현 2",
      groups: [
        {
          instruction: "1. 단어를 보고 알맞은 그림을 고르세요.",
          type: "wordpic",
          options: ["🍽️", "🏢", "🛒", "🌳"],
          items: [
            { word: "회사", answer: 1 },
            { word: "시장", answer: 2 },
            { word: "식당", answer: 0 },
            { word: "공원", answer: 3 }
          ]
        },
        {
          instruction: "2. <보기>에서 알맞은 것을 골라 쓰세요.",
          example: { lines: ["학교　　　집　　　공원"] },
          type: "fill",
          short: true,
          tight: true,
          items: [
            { pic: "🏠", q: "가: 어디예요?", before: "나:", after: "이에요.", answers: ["집"] },
            { pic: "🏫", q: "가: 어디예요?", before: "나:", after: "예요.", answers: ["학교"] }
          ]
        }
      ]
    },

    /* ---------------- 33쪽 ---------------- */
    {
      page: 33,
      heading: "문법 2: 에 가다",
      groups: [
        {
          instruction: "1. <보기>와 같이 문장을 완성하세요.",
          example: { pic: "🏠", lines: ["가: 어디에 가요?", "나: <u>집에 가요</u>. (집)"] },
          type: "fill",
          items: [
            { pic: "🍽️", q: "가: 어디에 가요?", before: "나:", hint: "식당", answers: ["식당에 가요"] },
            { pic: "🛒", q: "가: 어디에 가요?", before: "나:", hint: "시장", answers: ["시장에 가요"] }
          ]
        },
        {
          instruction: "2. 그림을 보고 <보기>와 같이 문장을 완성하세요.",
          example: { pic: "🏢", lines: ["가: 회사에 가요?", "나: 네, <u>회사에 가요</u>."] },
          type: "fill",
          items: [
            { pic: "🏫", q: "가: 학교에 가요?", before: "나: 네,", answers: ["학교에 가요"] },
            { pic: "🌳", q: "가: 공원에 가요?", before: "나: 네,", answers: ["공원에 가요"] },
            { pic: "🍽️", q: "가: 시장에 가요?", before: "나: 아니요,", answers: ["식당에 가요"] }
          ]
        }
      ]
    },

    /* ---------------- 36쪽 ---------------- */
    {
      page: 36,
      heading: "읽기",
      passage: {
        note: "※ [1~2] 다음을 읽고 질문에 답하세요. (로라 씨와 유라 씨의 문자 메시지)",
        text: "로라: 유라 씨, 오늘 뭐 해요?\n유라: 학교에 가요. 공부해요. 로라 씨는 학교에 가요?\n로라: 아니요. 저는 공원에 가요.\n유라: 뭐 해요?\n로라: 운동해요."
      },
      groups: [
        {
          instruction: "1. 읽은 내용과 같으면 O, 다르면 X 하세요.",
          type: "ox",
          items: [
            { q: "로라 씨는 공부해요.", answer: "X" },
            { q: "로라 씨는 공원에 가요.", answer: "O" },
            { q: "유라 씨는 학교에 가요.", answer: "O" }
          ]
        },
        {
          instruction: "2. 로라 씨는 오늘 뭐 해요?",
          type: "choice",
          items: [{ options: ["자요.", "일해요.", "공부해요.", "운동해요."], answer: 3 }]
        }
      ]
    },

    /* ---------------- 37쪽 ---------------- */
    {
      page: 37,
      heading: "쓰기",
      groups: [
        {
          instruction: "1. 그림을 보고 글을 완성하세요.",
          flow: [
            { pic: "🏫", label: "학교에 가다" },
            { num: 0, pic: "📖", label: "공부하다" },
            { num: 1, pic: "👫💬", label: "이야기하다" },
            { num: 2, pic: "🏠", label: "집에 가다" },
            { num: 3, pic: "🏋️", label: "운동하다" },
            { num: 4, pic: "😴", label: "자다" }
          ],
          circled: true,
          box: "저는 학교에 가요.",
          type: "fill",
          items: [
            { before: "", answers: ["공부해요"] },
            { before: "", answers: ["이야기해요"] },
            { before: "", answers: ["집에 가요"] },
            { before: "", answers: ["운동해요"] },
            { before: "", answers: ["자요"] }
          ]
        },
        {
          instruction: "2. <보기>와 같이 여러분의 하루 일과를 쓰세요.",
          example: { lines: ["학교에 가다 / 공부하다 → <u>저는 학교에 가요. 공부해요.</u>", "공원에 가다 / 운동하다 → <u>공원에 가요. 운동해요.</u>", "집에 가다 / 자다 → <u>집에 가요. 자요.</u>"] },
          type: "free",
          items: [{ placeholder: "저는 …에 가요. …해요." }]
        }
      ]
    },

    /* ---------------- 38~40쪽 ---------------- */
    {
      page: "38~40",
      heading: "실력 확인하기",
      groups: [
        {
          instruction: "1. (　　)에 알맞은 것을 고르세요.",
          box: "저는 도서관(　　) 가요.",
          type: "choice",
          items: [{ options: ["이", "에", "과", "의"], answer: 1 }]
        },
        {
          instruction: "2. 맞는 문장을 고르세요.",
          type: "choice",
          items: [{ options: ["로라 씨는 전화해요.", "마이클 씨는 자어요.", "민지 씨는 이야기하요.", "타완 씨는 지금 공부하요."], answer: 0 }]
        },
        {
          note: "※ [3~4] 다음 밑줄 친 부분에 들어갈 말로 알맞은 것을 고르세요.",
          instruction: "3.",
          box: "가: 치엔 씨, 어디에 가요?\n나: ____________________.",
          type: "choice",
          items: [{ options: ["자요", "일해요", "운동해요", "집에 가요"], answer: 3 }]
        },
        {
          instruction: "4.",
          box: "가: ____________________?\n나: 공부해요.",
          type: "choice",
          items: [{ options: ["학생이에요", "어디에 가요", "학교에 가요", "오늘 뭐 해요"], answer: 3 }]
        },
        {
          note: "※ [5~6] 다음 밑줄 친 부분에 들어갈 말로 알맞지 <u>않은</u> 것을 고르세요.",
          instruction: "5.",
          box: "가: 타완 씨, 지금 뭐 해요?\n나: ____________________.",
          type: "choice",
          items: [{ options: ["공부해요", "전화해요", "이야기해요", "회사원이에요"], answer: 3 }]
        },
        {
          instruction: "6.",
          box: "가: 타완 씨는 학교에 가요?\n나: 아니요, ____________________.",
          type: "choice",
          items: [{ options: ["안 가요", "집에 가요", "학교에 가요", "도서관에 가요"], answer: 2 }]
        },
        {
          note: "※ [7~8] 다음을 읽고 질문에 답하세요.",
          passage: "마크: 유키 씨, 오늘 어디에 가요?\n유키: 저는 회사에 가요. 일해요. 마크 씨는 어디에 가요?\n마크: 저는 학교에 가요. 공부해요. 집에 가요.",
          instruction: "7. 유키 씨는 어디에 가요?",
          type: "choice",
          items: [{ options: ["집", "회사", "서점", "학교"], answer: 1 }]
        },
        {
          instruction: "8. 이 글의 내용과 같은 것을 고르세요.",
          type: "choice",
          items: [{ options: ["마크 씨는 일해요.", "유키 씨는 공부해요.", "유키 씨는 집에 가요.", "마크 씨는 학교에 가요."], answer: 3 }]
        },
        {
          note: "※ [9~10] 다음을 읽고 질문에 답하세요.",
          passage: "저는 오늘 학교에 가요. 공부해요. 공원에 가요. 전화해요. 집에 가요. 운동해요.",
          instruction: "9. 무엇에 대한 글이에요?",
          type: "choice",
          items: [{ options: ["소개", "직업", "일상", "국적"], answer: 2 }]
        },
        {
          instruction: "10. 이 글의 내용과 <u>다른</u> 것을 고르세요.",
          type: "choice",
          items: [{ options: ["운동해요.", "식당에 가요.", "공원에 가요.", "학교에 가요."], answer: 1 }]
        }
      ]
    },

    /* ---------------- 40쪽 자기 평가 ---------------- */
    {
      page: 40,
      heading: "자기 평가",
      groups: [
        {
          instruction: "✪ 아는 것에 ✔ 하세요. (점수에 들어가지 않아요)",
          type: "self",
          items: [
            { area: "듣기", q: "‘어디에 가요? 무엇을 해요?’ 알아요?", scale: ["네", "아니요"] },
            { area: "읽기", q: "‘친구가 무엇을 해요?’ 알아요?", scale: ["네", "아니요"] },
            { area: "말하기", q: "여러분의 일상생활을 이야기할 수 있어요?", scale: ["2", "1", "0"] },
            { area: "쓰기", q: "여러분의 하루 일과를 쓸 수 있어요?", scale: ["2", "1", "0"] }
          ],
          checklist: [
            { area: "어휘와 표현", words: ["일하다", "공부하다", "운동하다", "자다", "전화하다", "이야기하다", "학교", "회사", "집", "공원", "식당", "시장"] },
            { area: "문법", words: ["-아요/어요", "에 가다"] }
          ],
          footnote: "✪ 잘할 수 있으면 2, 보통이면 1, 못하면 0에 ✔ 하세요."
        }
      ]
    }
  ]
};
