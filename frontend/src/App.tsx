import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Card, Spinner, Alert } from 'react-bootstrap';
import './App.css';

// 주식 데이터 타입을 정의합니다.
interface Stock {
  ticker: string;
  name: string;
  reason: string;
  current_price: string;
}

function App() {
  const [krStocks, setKrStocks] = useState<Stock[]>([]);
  const [usStocks, setUsStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        setError(null);

        // 백엔드 API로부터 데이터를 가져옵니다.
        const krResponse = await fetch('http://localhost:8000/api/recommendations/kr');
        const usResponse = await fetch('http://localhost:8000/api/recommendations/us');

        if (!krResponse.ok || !usResponse.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const krData = await krResponse.json();
        const usData = await usResponse.json();

        setKrStocks(krData);
        setUsStocks(usData);
      } catch (err) {
        setError('서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const renderStockCards = (stocks: Stock[]) => (
    <div className="d-flex flex-wrap">
      {stocks.map((stock) => (
        <Card key={stock.ticker} className="m-2" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{stock.name} ({stock.ticker})</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{stock.current_price} 원</Card.Subtitle>
            <Card.Text>
              <strong>추천 이유:</strong> {stock.reason}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  return (
    <Container className="py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-4">📰 뉴스 기반 저평가 주식 추천</h1>
      </header>

      {loading && <div className="text-center"><Spinner animation="border" /> <p>데이터를 불러오는 중...</p></div>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && !error && (
        <Tabs defaultActiveKey="korea" id="stock-recommendation-tabs" className="mb-3">
          <Tab eventKey="korea" title="국내 주식">
            {renderStockCards(krStocks)}
          </Tab>
          <Tab eventKey="usa" title="해외 주식">
            {renderStockCards(usStocks)}
          </Tab>
        </Tabs>
      )}
    </Container>
  );
}

export default App;