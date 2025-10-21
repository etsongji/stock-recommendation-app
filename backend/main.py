
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (Cross-Origin Resource Sharing) 설정
# 프론트엔드 (React) 애플리케이션이 백엔드 API에 접근할 수 있도록 허용합니다.
origins = [
    "http://localhost:3000", # React 개발 서버 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "주식 추천 서비스 백엔드"}

@app.get("/api/recommendations/kr")
def get_korean_stock_recommendations():
    # 여기에 한국 주식 추천 로직을 구현합니다.
    # 지금은 임시 데이터를 반환합니다.
    return [
        {"ticker": "005930", "name": "삼성전자", "reason": "AI 반도체 관련 긍정적 뉴스", "current_price": "85,000"},
        {"ticker": "035720", "name": "카카오", "reason": "신규 서비스 출시에 대한 기대감", "current_price": "55,000"},
    ]

@app.get("/api/recommendations/us")
def get_us_stock_recommendations():
    # 여기에 미국 주식 추천 로직을 구현합니다.
    # 지금은 임시 데이터를 반환합니다.
    return [
        {"ticker": "NVDA", "name": "NVIDIA", "reason": "데이터 센터 매출 성장", "current_price": "950.00"},
        {"ticker": "AAPL", "name": "Apple", "reason": "신형 iPhone 판매 호조", "current_price": "170.00"},
    ]

# 서버 실행을 위한 uvicorn 명령어 (터미널에서 직접 실행):
# uvicorn main:app --reload --port 8000
