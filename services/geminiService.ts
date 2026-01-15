import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, FortuneResult } from "../types";

// ⏳ 재시도 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SYSTEM_INSTRUCTION = `
# Role: AI 붉은 말 (Deterministic Fortune Teller)
당신은 입력된 생년월일을 바탕으로 **항상 동일한 결과**를 산출해야 하는 정밀 운세 분석가입니다.

# 🔐 일관성 유지 규칙 (Consistency Rules)
1. **창작 금지:** 막연하게 운세를 지어내지 마세요. 반드시 2026년 월별 간지표와 사용자 차트의 상호작용을 계산하여 결과를 도출하세요.
2. **2026년 병오년(丙午年) 분석 기준:**
   - 강한 화(Fire)의 기운이 사용자의 사주(특히 일간, 일지)나 점성술 차트(화성, 토성)와 부딪힐 때 발생하는 '충돌'과 '과열'을 주의 깊게 살피세요.

# ✍️ 작성 가이드
1. **톤앤매너:** 다정하고 따뜻한 친구 같은 말투. 절대 겁을 주지 말고, '미리 알면 피할 수 있는 조언'으로 전달하세요.
2. **분량:** 모든 설명은 읽기 쉽게 10줄 이내로 간결하게.
2-1. 연애, 직업, 우정은 무조건 5줄로 자세히 써 줘.

# Task Flow
1. **지오코딩 & 천문 계산:** 좌표, 행성 위치, 상승궁 계산.
2. **융합 분석:**
   - 💘 연애, 💼 직업, 🤝 우정 상세 분석.
   - ⚠️ **주의사항 분석:** 사주의 충/형/해/파 또는 점성술의 하드 아스펙트를 찾아 조심해야 할 점 도출.
3. **월별 운세:** 지정된 월건(Monthly Pillars)에 맞춰 작성.
`;

export const fetchFortune = async (input: UserInput, retries = 2): Promise<FortuneResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey });

  const birthTimeStr = input.isTimeUnknown
      ? "시간 모름 (정오 기준)"
      : `${input.birthHour}시 ${input.birthMinute}분`;

  const prompt = `
    # 📍 입력 데이터 (고정값)
    - 출생지: "${input.birthPlace}"
    - 생년월일: ${input.birthYear}년 ${input.birthMonth}월 ${input.birthDay}일
    - 시간: ${birthTimeStr}
    - 성별: ${input.gender === 'male' ? '남성' : '여성'}

    # 🚀 요청 사항
    위 데이터를 바탕으로 천문 차트와 사주를 분석하여 JSON을 완성하세요.
    특히 **'cautionary_advice'** 항목에는 2026년에 사용자가 가장 조심해야 할 부분(건강, 말실수, 돈 거래 등)과 그 해결책을 구체적으로 적어주세요.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      geo_info: {
        type: Type.OBJECT,
        properties: {
          location_name: { type: Type.STRING },
          latitude: { type: Type.STRING },
          longitude: { type: Type.STRING },
          timezone: { type: Type.STRING }
        },
        required: ["location_name", "latitude", "longitude"]
      },
      astrology_chart: {
        type: Type.OBJECT,
        properties: {
          ascendant: { type: Type.STRING },
          sun: { type: Type.STRING },
          moon: { type: Type.STRING },
          house_emphasis: { type: Type.STRING }
        }
      },
      personality: { type: Type.STRING },
      generalFortune: { type: Type.STRING },
      keywords: { type: Type.ARRAY, items: { type: Type.STRING } },

      cautionary_advice: {
        type: Type.OBJECT,
        description: "2026년에 특별히 조심해야 할 점과 해결책",
        properties: {
          title: { type: Type.STRING, description: "주의사항 핵심 키워드 (예: '충동구매 주의', '말실수 조심')" },
          content: { type: Type.STRING, description: "왜 조심해야 하는지, 어떤 상황이 올 수 있는지 설명 (5줄 이내)" },
          solution: { type: Type.STRING, description: "이를 예방하거나 해결하기 위한 구체적인 조언 (행동 지침)" }
        },
        required: ["title", "content", "solution"]
      },

      specific_fortunes: {
        type: Type.OBJECT,
        properties: {
          love: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              detail: { type: Type.STRING },
              score: { type: Type.INTEGER }
            }
          },
          career: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              detail: { type: Type.STRING },
              score: { type: Type.INTEGER }
            }
          },
          friendship: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              detail: { type: Type.STRING },
              score: { type: Type.INTEGER }
            }
          }
        },
        required: ["love", "career", "friendship"]
      },
      monthlyFortune: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            month: { type: Type.INTEGER },
            content: { type: Type.STRING },
            mood: { type: Type.STRING, enum: ["good", "neutral", "caution"] }
          },
          required: ["month", "content", "mood"]
        }
      }
    },
    required: ["geo_info", "astrology_chart", "personality", "generalFortune", "keywords", "cautionary_advice", "specific_fortunes", "monthlyFortune"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.0, // 일관성 유지
        topP: 0.8,
        topK: 40,
      }
    });

    return JSON.parse(response.text!) as FortuneResult;

  } catch (error: any) {
    if (error.message?.includes('429') || error.status === 429 || error.status === 503) {
      if (retries > 0) {
        console.warn(`⏳ Model busy or Quota exceeded. Retrying... (${retries} attempts left)`);
        await delay(2000); // 2초 대기
        return fetchFortune(input, retries - 1);
      }
    }
    console.error("Error fetching fortune:", error);
    throw error;
  }
};
