# `bithumb.ts`

[빗썸 API](https://apidocs.bithumb.com/)를 위한 **비공식** TypeScript/JavaScript 클라이언트입니다. 빗썸에서 시장 데이터에 쉽게 접근하고 거래를 수행할 수 있습니다.

## 기능

-   📈 티커 및 오더북 데이터 검색
-   💰 입출금
-   🔐 PRIVATE 요청(accessKey, secretKey) 지원
-   ✅ TypeScript를 사용한 유형 안전 응답
-   🌐 REST API 지원
-   🍃 WebSocket 지원

## 설치

```bash
npm install bithumb.ts
```

```bash
yarn add bithumb.ts
```

## 사용법

```ts
import { Bithumb } from 'bithumb.ts';

const client = new Bithumb({
    accessKey: 'YOUR_API_ACCESS_KEY',
    secretKey: 'YOUR_API_SECRET_KEY',
});

// Public API
const ticker = await client.getTicker({
    markets: ['KRW-BTC'],
});

// Private API
const order = await client.order({
    market: 'KRW-BTC',
    side: 'bid',
    order_type: 'limit',
    price: '84000000',
    volume: '0.001',
});
```

## API 적용 범위

### Public

-   [x] 전체

### Private

-   [x] 전체

> 전체 API 적용 범위 및 자세한 내용은 [Bithumb 공식 API 문서](https://apidocs.bithumb.com/)를 참조하세요.

## 로드맵

-   [ ] WebSocket 지원
-   [ ] Rate Limit 처리
-   [ ] 테스트 코드 작성

## 기여

PR과 제안을 환영합니다! 주요 변경 사항에 대해 논의하려면 이슈를 개설해 주세요.

## 참고사항

Private API는 아직 **테스트되지** 않았습니다.
타입은 **정확성**을 보장하지 못합니다.
이 라이브러리를 사용하면서 생긴 모든 청구, 손해 또는 기타에 대해 책임을 지지 않습니다.

## 라이선스

MIT
