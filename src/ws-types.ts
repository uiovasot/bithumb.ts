export interface WSTickerPayload {
    /** 마켓 코드 리스트 */
    codes: string[];
    /** 스냅샷 시세만 제공 */
    isOnlySanpshot?: boolean;
    /** 실시간 시세만 제공 */
    isOnlyRealtime?: boolean;
}

export interface WSTicker {
    /** 마켓 코드 */
    code: string;
    /** 시가 */
    opening_price: number;
    /** 고가 */
    high_price: number;
    /** 저가 */
    low_price: number;
    /** 현재가 */
    trade_price: number;
    /** 전일 종가 */
    prev_closing_price: number;
    /** 전일 대비 */
    change: 'RISE' | 'EVEN' | 'FALL';
    /** 부호 없는 전일 대비 값 */
    change_price: number;
    /** 전일 대비 값 */
    signed_change_price: number;
    /** 부호 없는 전일 대비 등락율 */
    change_rate: number;
    /** 전일 대비 등락율 */
    signed_change_rate: number;
    /** 가장 최근 거래량 */
    trade_volume: number;
    /** 누적 거래량(KST 0시 기준) */
    acc_trade_volume: number;
    /** 24시간 누적 거래량 */
    acc_trade_volume_24h: number;
    /** 누적 거래대금(KST 0시 기준) */
    acc_trade_price: number;
    /** 24시간 누적 거래대금 */
    acc_trade_price_24h: number;
    /** 최근 거래 일자(KST) */
    trade_date: string;
    /** 최근 거래 시각(KST) */
    trade_time: string;
    /** 체결 타임스탬프 (milliseconds) */
    trade_timestamp: number;
    /** 매수/매도 구분 */
    ask_bid: 'ASK' | 'BID';
    /** 누적 매도량 */
    acc_ask_volume: number;
    /** 누적 매수량 */
    acc_bid_volume: number;
    /** 52주 최고가 */
    highest_52_week_price: number;
    /** 52주 최고가 달성일 */
    highest_52_week_date: string;
    /** 52주 최저가 */
    lowest_52_week_price: number;
    /** 52주 최저가 달성일 */
    lowest_52_week_date: string;
    /** 거래상태 */
    market_state: string;
    /** 거래 정지 여부 */
    is_trading_suspended: boolean;
    /** 거래지원 종료일 */
    delisting_date?: Date;
    /** 유의 종목 여부 */
    market_warning: 'NONE' | 'CAUTION';
    /** 타임스탬프 (millisecond) */
    timestamp: number;
    /** 스트림 타입 */
    stream_type: 'SNAPSHOT' | 'REALTIME';
}

export interface WSTradePayload {
    /** 마켓 코드 리스트 */
    codes: string[];
    /** 스냅샷 시세만 제공 */
    isOnlySanpshot?: boolean;
    /** 실시간 시세만 제공 */
    isOnlyRealtime?: boolean;
}

export interface WSTrade {
    /** 마켓 코드 */
    code: string;
    /** 체결 가격 */
    trade_price: number;
    /** 체결량 */
    trade_volume: number;
    /** 매수/매도 구분 */
    ask_bid: 'ASK' | 'BID';
    /** 전일 종가 */
    prev_closing_price: number;
    /** 전일 대비 */
    change: 'RISE' | 'EVEN' | 'FALL';
    /** 부호 없는 전일 대비 값 */
    change_price: number;
    /** 최근 거래 일자(KST) */
    trade_date: string;
    /** 최근 거래 시각(KST) */
    trade_time: string;
    /** 체결 타임스탬프 (milliseconds) */
    trade_timestamp: number;
    /** 타임스탬프 (millisecond) */
    timestamp: number;
    /** 체결 번호 (Unique) */
    sequential_id: number;
    /** 스트림 타입 */
    stream_type: 'SNAPSHOT' | 'REALTIME';
}

export interface WSOrderbookPayload {
    /** 마켓 코드 리스트 */
    codes: string[];
    /** 모아보기 단위 */
    level?: number;
    /** 스냅샷 시세만 제공 */
    isOnlySanpshot?: boolean;
    /** 실시간 시세만 제공 */
    isOnlyRealtime?: boolean;
}

export interface WSOrderbook {
    /** 마켓 코드 */
    code: string;
    /** 호가 매도 총 잔량 */
    total_ask_size: number;
    /** 호가 매수 총 잔량 */
    total_bid_size: number;
    /** 호가 리스트 */
    orderbook_units: Array<{
        /** 매도 호가 */
        ask_price: number;
        /** 매수 호가 */
        bid_price: number;
        /** 매도 잔량 */
        ask_size: number;
        /** 매수 잔량 */
        bid_size: number;
    }>;
    /** 타임스탬프 (millisecond) */
    timestamp: number;
    /** 모아보기 단위 */
    level?: number;
}

export interface WSMyOrderPayload {
    /** 마켓 코드 리스트 */
    codes: string[];
}

export interface WSMyOrder {
    /** 마켓 코드 */
    code: string;
    /** 주문 고유 아이디 */
    uuid: string;
    /** 매수/매도 구분 */
    ask_bid: 'ASK' | 'BID';
    /** 주문 타입 */
    order_type: 'limit' | 'price' | 'market';
    /** 주문 상태 */
    state: 'wait' | 'trade' | 'done' | 'cancel';
    /** 체결의 고유 아이디 */
    trade_uuid: string;
    /** 주문 가격, 체결 가격 (state: trade 일 때) */
    price: number;
    /** 주문량, 체결량 (state: trade 일 때) */
    volume: number;
    /** 체결 후 남은 주문 양 */
    remaining_volume: number;
    /** 체결된 양 */
    executed_volume: number;
    /** 해당 주문에 걸린 체결 수 */
    trades_count: number;
    /** 수수료로 예약된 비용 */
    reserved_fee: number;
    /** 남은 수수료 */
    remaining_fee: number;
    /** 사용된 수수료 */
    paid_fee: number;
    /** 체결된 금액 */
    executed_funds: number;
    /** 체결 타임스탬프 (millisecond) */
    trade_timestamp: number;
    /** 주문 타임스탬프 (millisecond) */
    order_timestamp: number;
    /** 타임스탬프 (millisecond) */
    timestamp: number;
    /** 스트림 타입 */
    stream_type: 'REALTIME';
}

export interface WSMyAsset {
    /** 타입 */
    type: 'myAsset';
    /** 자산 리스트 */
    assets: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        currency: string;
        /** 주문가능 수량 */
        balance: number;
        /** 주문 중 묶여있는 수량 */
        locked: number;
    }[];
    /** 자산 타임스탬프 (millisecond) */
    asset_timestamp: number;
    /** 타임스탬프 (millisecond) */
    timestamp: number;
    /** 스트림 타입 */
    stream_type: 'REALTIME';
}
