export type NumberString = `${number}`;

export interface BithumbOptions {
    accessKey: string;
    secretKey: string;
}

export interface ApiError {
    error: { name: number; message: string };
}

export interface Market<T = boolean> {
    /** Market information provided by Bithumb */
    market: string;
    /** 거래 대상 디지털 자산 한글명 */
    korean_name: string;
    /** 거래 대상 디지털 자산 영문명 */
    english_name: string;
    /** 유의 종목 여부 */
    market_warning: T extends true ? 'NONE' | 'CAUTION' : undefined;
}

export type MinuteUnit = 1 | 3 | 5 | 10 | 15 | 30 | 60 | 240;

export interface CommonCandleParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string;
    /** 마지막 캔들 시각 (exclusive). 비워서 요청 시 가장 최근 캔들 */
    to?: number | string | Date | null;
    /** 캔들 개수 (최대 200개까지 요청 가능) */
    count?: number | null;
}

export interface MinuteCandleParams extends CommonCandleParams {
    unit: MinuteUnit;
}

export interface DayCandleParams extends CommonCandleParams {
    /** 종가 환산 화폐 단위 (예: KRW로 명시 시 원화 환산 가격 반환) */
    convertingPriceUnit: string;
}

export interface MinuteCandle {
    /** 마켓명 */
    market: string;
    /** 캔들 기준 시각(UTC 기준) */
    candle_date_time_utc: string;
    /** 캔들 기준 시각(KST 기준) */
    candle_date_time_kst: string;
    /** 시가 */
    opening_price: number;
    /** 고가 */
    high_price: number;
    /** 저가 */
    low_price: number;
    /** 종가 */
    trade_price: number;
    /** 캔들 종료 시각(KST 기준) */
    timestamp: number;
    /** 누적 거래 금액 */
    candle_acc_trade_price: number;
    /** 누적 거래량 */
    candle_acc_trade_volume: number;
    /** 분 단위(유닛) */
    unit: MinuteUnit;
}

export interface DayCandle {
    /** 마켓명 */
    market: string;
    /** 캔들 기준 시각(UTC 기준) */
    candle_date_time_utc: string;
    /** 캔들 기준 시각(KST 기준) */
    candle_date_time_kst: string;
    /** 시가 */
    opening_price: number;
    /** 고가 */
    high_price: number;
    /** 저가 */
    low_price: number;
    /** 종가 */
    trade_price: number;
    /** 캔들 종료 시각(KST 기준) */
    timestamp: number;
    /** 누적 거래 금액 */
    candle_acc_trade_price: number;
    /** 누적 거래량 */
    candle_acc_trade_volume: number;
    /** 전일 종가(UTC 0시 기준) */
    prev_closing_price: number;
    /** 전일 종가 대비 변화 금액 */
    change_price: number;
    /** 전일 종가 대비 변화량 */
    change_rate: number;
    /** 종가 환산 화폐 단위로 환산된 가격 */
    converted_trade_price?: number;
}

export interface WeekMonthCandle {
    /** 마켓명 */
    market: string;
    /** 캔들 기준 시각(UTC 기준) */
    candle_date_time_utc: string;
    /** 캔들 기준 시각(KST 기준) */
    candle_date_time_kst: string;
    /** 시가 */
    opening_price: number;
    /** 고가 */
    high_price: number;
    /** 저가 */
    low_price: number;
    /** 종가 */
    trade_price: number;
    /** 캔들 종료 시각(KST 기준) */
    timestamp: number;
    /** 누적 거래 금액 */
    candle_acc_trade_price: number;
    /** 누적 거래량 */
    candle_acc_trade_volume: number;
}

export interface TradeTickParams {
    /** 마켓 코드 (ex. KRW-BTC) */
    market: string;
    /** 마지막 체결 시각. 형식 : [HHmmss 또는 HH:mm:ss]. 비워서 요청시 가장 최근 데이터 */
    to?: string | null;
    /** 체결 개수 (최대 200개까지 요청 가능) */
    count?: number | null;
    /** 페이지네이션 커서 (sequentialId) */
    cursor?: string | null;
    /** 최근 체결 날짜 기준 7일 이내의 이전 데이터 조회 가능. 비워서 요청 시 가장 최근 체결 날짜 반환. (범위: 1 ~ 7) */
    daysAgo?: number | null;
}

export interface TradeTick {
    /** 마켓명 */
    market: string;
    /** 체결 일자(UTC 기준) */
    trade_date_utc: string;
    /** 체결 시각(UTC 기준) */
    trade_time_utc: string;
    /** 체결 타임스탬프 */
    timestamp: number;
    /** 체결 가격 */
    trade_price: number;
    /** 체결량 */
    trade_volume: number;
    /** 전일 종가(UTC 0시 기준) */
    prev_closing_price: number;
    /** 변화량 */
    change_price: number;
    /** 매도/매수 구분 */
    ask_bid: 'ASK' | 'BID';
    /** 체결 번호(Unique) */
    /** sequential_id 필드는 체결의 유일성을 판단하기 위한 근거가 될 수 있으나 체결 순서를 보장하지 않습니다. */
    sequential_id: string;
}

export interface TickerParams {
    markets: string[];
}

export interface Ticker {
    /** 종목 구분 코드 */
    market: string;
    /** 최근 거래 일자(UTC) */
    trade_date: string;
    /** 최근 거래 시각(UTC) */
    trade_time: string;
    /** 최근 거래 일자(KST) */
    trade_date_kst: string;
    /** 최근 거래 시각(KST) */
    trade_time_kst: string;
    /** 최근 거래 일시(UTC) */
    trade_timestamp: number;
    /** 시가 */
    opening_price: number;
    /** 고가 */
    high_price: number;
    /** 저가 */
    low_price: number;
    /** 종가(현재가) */
    trade_price: number;
    /** 전일 종가(KST 0시 기준) */
    prev_closing_price: number;
    /** 변화 상태 (EVEN: 보합, RISE: 상승, FALL: 하락) */
    change: 'EVEN' | 'RISE' | 'FALL';
    /** 변화액의 절대값 */
    change_price: number;
    /** 변화율의 절대값 */
    change_rate: number;
    /** 부호가 있는 변화액 */
    signed_change_price: number;
    /** 부호가 있는 변화율 */
    signed_change_rate: number;
    /** 가장 최근 거래량 */
    trade_volume: number;
    /** 누적 거래대금(KST 0시 기준) */
    acc_trade_price: number;
    /** 24시간 누적 거래대금 */
    acc_trade_price_24h: number;
    /** 누적 거래량(KST 0시 기준) */
    acc_trade_volume: number;
    /** 24시간 누적 거래량 */
    acc_trade_volume_24h: number;
    /** 52주 신고가 */
    highest_52_week_price: number;
    /** 52주 신고가 달성일 */
    highest_52_week_date: string;
    /** 52주 신저가 */
    lowest_52_week_price: number;
    /** 52주 신저가 달성일 */
    lowest_52_week_date: string;
    /** 타임스탬프 */
    timestamp: number;
}

export interface OrderBookParams {
    markets: string[];
}

export interface OrderBook {
    /** 마켓 코드 */
    market: string;
    /** 호가 생성 시각 (UTC) */
    timestamp: number;
    /** 호가 매도 총 잔량 */
    total_ask_size: number;
    /** 호가 매수 총 잔량 */
    total_bid_size: number;
    /** 호가 단위 */
    orderbook_units: {
        /** 매도호가 */
        ask_price: number;
        /** 매수호가 */
        bid_price: number;
        /** 매도 잔량 */
        ask_size: number;
        /** 매수 잔량 */
        bid_size: number;
    }[];
}

export interface VirtualAssetWarning {
    /** 빗썸에서 제공중인 시장 정보 */
    market: string;
    /** 경보 유형 */
    warning_type:
        | 'PRICE_SUDDEN_FLUCTUATION'
        | 'TRADING_VOLUME_SUDDEN_FLUCTUATION'
        | 'DEPOSIT_AMOUNT_SUDDEN_FLUCTUATION'
        | 'PRICE_DIFFERENCE_HIGH'
        | 'SPECIFIC_ACCOUNT_HIGH_TRANSACTION'
        | 'EXCHANGE_TRADING_CONCENTRATION';
    /** 가상 자산 경보 종료일시(KST 기준) */
    end_date: string;
}

export interface Account {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 주문가능 금액/수량 */
    balance: NumberString;
    /** 주문 중 묶여있는 금액/수량 */
    locked: NumberString;
    /** 매수평균가 */
    avg_buy_price: string;
    /** 매수평균가 수정 여부 */
    avg_buy_price_modified: boolean;
    /** 평단가 기준 화폐 */
    unit_currency: string;
}

export interface OrderChanceParams {
    market: string;
}

export interface OrderChance {
    /** 매수 수수료 비율 */
    bid_fee: NumberString;
    /** 매도 수수료 비율 */
    ask_fee: NumberString;
    /** 마켓 매수 수수료 비율 */
    maker_bid_fee: NumberString;
    /** 마켓 매도 수수료 비율 */
    maker_ask_fee: NumberString;
    /** 마켓 정보 */
    market: {
        /** 마켓의 유일 키 */
        id: string;
        /** 마켓 이름 */
        name: string;
        /** 지원 주문 방식 */
        order_types: string[];
        /** 매도 주문 지원 방식 */
        ask_types: string[];
        /** 매수 주문 지원 방식 */
        bid_types: string[];
        /** 지원 주문 종류 */
        order_sides: string[];
        /** 매수 시 제약사항 */
        bid: {
            /** 화폐를 의미하는 영문 대문자 코드 */
            currency: string;
            /** 주문금액 단위 */
            price_unit: NumberString;
            /** 최소 매도/매수 금액 */
            min_total: NumberString;
        };
        /** 매도 시 제약사항 */
        ask: {
            /** 화폐를 의미하는 영문 대문자 코드 */
            currency: string;
            /** 주문금액 단위 */
            price_unit: NumberString;
            /** 최소 매도/매수 금액 */
            min_total: NumberString;
        };
        /** 최대 매도/매수 금액 */
        max_total: NumberString;
        /** 마켓 운영 상태 */
        state: string;
    };
    /** 매수 시 사용하는 화폐의 계좌 상태 */
    bid_account: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        currency: string;
        /** 주문가능 금액/수량 */
        balance: NumberString;
        /** 주문 중 묶여있는 금액/수량 */
        locked: NumberString;
        /** 매수평균가 */
        avg_buy_price: string;
        /** 매수평균가 수정 여부 */
        avg_buy_price_modified: boolean;
        /** 평단가 기준 화폐 */
        unit_currency: string;
    };
    /** 매도 시 사용하는 화폐의 계좌 상태 */
    ask_account: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        currency: string;
        /** 주문가능 금액/수량 */
        balance: NumberString;
        /** 주문 중 묶여있는 금액/수량 */
        locked: NumberString;
        /** 매수평균가 */
        avg_buy_price: string;
        /** 매수평균가 수정 여부 */
        avg_buy_price_modified: boolean;
        /** 평단가 기준 화폐 */
        unit_currency: string;
    };
}

export interface SingleOrderParams {
    /** 주문 UUID */
    uuid: string;
}

export interface SingleOrder {
    /** 주문의 고유 아이디 */
    uuid: string;
    /** 주문 종류 (bid: 매수, ask: 매도) */
    side: 'bid' | 'ask';
    /** 주문 방식 (limit: 지정가, price: 시장가, stop_limit: 지정가-손절, stop_price: 시장가-손절) */
    ord_type: 'limit' | 'price' | 'stop_limit' | 'stop_price';
    /** 주문 당시 화폐 가격 */
    price: string;
    /** 주문 상태 (wait: 대기, done: 완료, cancel: 취소) */
    state: 'wait' | 'done' | 'cancel';
    /** 마켓의 유일키 */
    market: string;
    /** 주문 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 사용자가 입력한 주문 양 */
    volume: NumberString;
    /** 체결 후 남은 주문 양 */
    remaining_volume: NumberString;
    /** 수수료로 예약된 비용 */
    reserved_fee: NumberString;
    /** 남은 수수료 */
    remaining_fee: NumberString;
    /** 사용된 수수료 */
    paid_fee: NumberString;
    /** 거래에 사용중인 비용 */
    locked: NumberString;
    /** 체결된 양 */
    executed_volume: NumberString;
    /** 해당 주문에 걸린 체결 수 */
    trades_count: number;
    /** 체결 정보 */
    trades: {
        /** 마켓의 유일 키 */
        market: string;
        /** 체결의 고유 아이디 */
        uuid: string;
        /** 체결 가격 */
        price: string;
        /** 체결 양 */
        volume: NumberString;
        /** 체결된 총 가격 */
        funds: string;
        /** 체결 종류 (bid: 매수, ask: 매도) */
        side: 'bid' | 'ask';
        /** 체결 시각 (ISO 8601 형식) */
        created_at: string;
    }[];
}

export interface OrderListParams {
    /** 마켓 아이디 (ex. KRW-BTC) */
    market?: string;
    /** 주문 UUID의 목록 */
    uuids?: string[];
    /** 주문 상태 */
    state?: 'wait' | 'watch' | 'done' | 'cancel';
    /** 주문 상태의 목록 */
    states?: ('wait' | 'watch' | 'done' | 'cancel')[];
    /** 페이지 수 (default: 1) */
    page?: number;
    /** 개수 제한 (default: 100, limit: 100) */
    limit?: number;
    /** 정렬방식 (asc: 오름차순, desc: 내림차순, default: desc) */
    order_by?: 'asc' | 'desc';
}

export interface Order {
    /** 주문의 고유 아이디 */
    uuid: string;
    /** 주문 종류 (bid: 매수, ask: 매도) */
    side: 'bid' | 'ask';
    /** 주문 방식 (limit: 지정가, price: 시장가, stop_limit: 지정가-손절, stop_price: 시장가-손절) */
    ord_type: 'limit' | 'price' | 'stop_limit' | 'stop_price';
    /** 주문 당시 화폐 가격 */
    price: string;
    /** 주문 상태 (wait: 대기, done: 완료, cancel: 취소) */
    state: 'wait' | 'done' | 'cancel';
    /** 마켓의 유일키 */
    market: string;
    /** 주문 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 사용자가 입력한 주문 양 */
    volume: NumberString;
    /** 체결 후 남은 주문 양 */
    remaining_volume: NumberString;
    /** 수수료로 예약된 비용 */
    reserved_fee: NumberString;
    /** 남은 수수료 */
    remaining_fee: NumberString;
    /** 사용된 수수료 */
    paid_fee: NumberString;
    /** 거래에 사용중인 비용 */
    locked: NumberString;
    /** 체결된 양 */
    executed_volume: NumberString;
    /** 해당 주문에 걸린 체결 수 */
    trades_count: number;
}

export interface OrderV2Params {
    /** 마켓 ID */
    market: string;
    /** 주문 종류 (bid: 매수, ask: 매도) */
    side: 'bid' | 'ask';
    /** 주문 방식 (limit: 지정가, price: 시장가, stop_limit: 지정가-손절, stop_price: 시장가-손절) */
    order_type: 'limit' | 'price' | 'stop_limit' | 'stop_price';
    /** 주문 가격 */
    price: string;
    /** 주문 상태 (wait: 대기, done: 완료, cancel: 취소) */
    state: 'wait' | 'done' | 'cancel';
    /** 주문 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 사용자가 입력한 주문 양 */
    volume: NumberString;
}

export interface OrderV2 {
    /** 주문의 고유 아이디 */
    order_id: string;
    /** 마켓의 유일키 */
    market: string;
    /** 주문 종류 (bid: 매수, ask: 매도) */
    side: 'bid' | 'ask';
    /** 주문 방식 (limit: 지정가, price: 시장가, stop_limit: 지정가-손절, stop_price: 시장가-손절) */
    order_type: 'limit' | 'price' | 'stop_limit' | 'stop_price';
    /** 주문 생성 시간 (ISO 8601 형식) */
    created_at: string;
}

export interface CancelOrderParams {
    /** 주문 UUID */
    order_id: string;
}

export interface CancelOrder {
    /** 취소한 주문의 고유 아이디 (구 uuid) */
    order_id: string;
    /** 주문 생성 시간 */
    created_at: string;
}

export interface WithdrawListParams {
    /** 화폐 코드 (ex. BTC, ETH) */
    currency: string;
    /** 출금 UUID의 목록 */
    uuids?: string[];
    /** 출금 TXID의 목록 */
    txids?: string[];
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state?: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 페이지 수 (default: 1) */
    page?: number;
    /** 개수 제한 (default: 100, max: 100) */
    limit?: number;
    /** 정렬방식 (asc: 오름차순, desc: 내림차순, default: desc) */
    order_by?: 'asc' | 'desc';
}

export interface Withdraw {
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 */
    net_type: string;
    /** 출금의 트랜잭션 아이디 */
    txid: string;
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 출금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 출금 금액/수량 */
    amount: NumberString;
    /** 출금 수수료 */
    fee: NumberString;
    /** 출금 유형 (default: 일반출금) */
    transaction_type?: string;
}

export interface WithdrawKrwListParams {
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state?: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 UUID의 목록 */
    uuids?: string[];
    /** 출금 TXID의 목록 */
    txids?: string[];
    /** 페이지 수 (default: 1) */
    page?: number;
    /** 개수 제한 (default: 100, max: 100) */
    limit?: number;
    /** 정렬방식 (asc: 오름차순, desc: 내림차순, default: desc) */
    order_by?: 'asc' | 'desc';
}

export interface WthdrawKrw {
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 출금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 출금 금액/수량 */
    amount: NumberString;
    /** 출금 수수료 */
    fee: NumberString;
}

export interface SingleWithdrawParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 출금의 트랜잭션 아이디 */
    txid: string;
}

export interface SingleWithdraw {
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 */
    net_type: string;
    /** 출금의 트랜잭션 아이디 */
    txid: string;
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 출금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 출금 금액/수량 */
    amount: NumberString;
    /** 출금 수수료 */
    fee: NumberString;
    /** 출금 유형 (default: 일반출금) */
    transaction_type?: string;
}

export interface WithdrawChanceParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 */
    net_type: string;
}

export interface WithdrawChance {
    /** 사용자의 보안등급 정보 */
    member_level: {
        /** 사용자의 보안등급 */
        security_level: number;
        /** 사용자의 수수료등급 */
        fee_level: number;
        /** 사용자의 이메일 인증 여부 */
        email_verified: boolean;
        /** 사용자의 실명 인증 여부 */
        identity_auth_verified: boolean;
        /** 사용자의 계좌 인증 여부 */
        bank_account_verified: boolean;
        /** 2FA 인증 수단의 활성화 여부 */
        two_factor_auth_verified: boolean;
        /** 사용자의 계정 보호 상태 */
        locked: boolean;
        /** 사용자의 출금 보호 상태 */
        wallet_locked: boolean;
    };
    /** 화폐 정보 */
    currency: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        code: string;
        /** 해당 화폐의 출금 수수료 */
        withdraw_fee: NumberString;
        /** 화폐의 디지털 자산 여부 */
        is_coin: boolean;
        /** 해당 화폐의 지갑 상태 */
        wallet_state: string;
        /** 해당 화폐가 지원하는 입출금 정보 */
        wallet_support: string[];
    };
    /** 사용자의 계좌 정보 */
    account: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        currency: string;
        /** 주문가능 금액/수량 */
        balance: NumberString;
        /** 주문 중 묶여있는 금액/수량 */
        locked: NumberString;
        /** 평균매수가 */
        avg_buy_price: string;
        /** 평균매수가 수정 여부 */
        avg_buy_price_modified: boolean;
        /** 평단가 기준 화폐 */
        unit_currency: string;
    };
    /** 출금 제약 정보 */
    withdraw_limit: {
        /** 화폐를 의미하는 영문 대문자 코드 */
        currency: string;
        /** 출금 최소 금액/수량 */
        minimum: string;
        /** 1회 출금 한도 */
        onetime: string;
        /** 1일 출금 한도 */
        daily: string;
        /** 1일 잔여 출금 한도 */
        remaining_daily: string;
        /** 출금 금액/수량 소수점 자리 수 */
        fixed: number;
        /** 출금 지원 여부 */
        can_withdraw: boolean;
        /** 통합 1일 잔여 출금 한도 */
        remaining_daily_krw: string;
    };
}

export interface WithdrawCoinParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 */
    net_type: string;
    /** 출금 수량 */
    amount: NumberString;
    /** 출금 주소 */
    address: string;
    /** 2차 출금 주소 (필요한 디지털 자산에 한해서) */
    secondary_address?: string;
    /** 출금 거래소명(영문) */
    exchange_name?: string;
    /** 수취인 개인/법인 여부 */
    receiver_type?: 'personal' | 'corporation';
    /** 수취인 국문명(개인 : 개인 국문명, 법인 : 법인 대표자 국문명) */
    receiver_ko_name?: string;
    /** 수취인 영문명(개인 : 개인 영문명, 법인 : 법인 대표자 영문명) */
    receiver_en_name?: string;
    /** 법인 국문명(수취인 법인인 경우 필수) */
    receiver_corp_ko_name?: string;
    /** 법인 영문명(수취인 법인인 경우 필수) */
    receiver_corp_en_name?: string;
}

export interface WithdrawCoin {
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 */
    net_type: string;
    /** 출금의 트랜잭션 아이디 */
    txid: string;
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 출금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 출금 금액/수량 */
    amount: NumberString;
    /** 출금 수수료 */
    fee: NumberString;
    /** 원화 환산 가격 */
    krw_amount?: string;
    /** 출금 유형 (default: 일반출금) */
    transaction_type?: string;
}

export interface WithdrawKrwParams {
    /** 출금액 */
    amount: NumberString;
    /** 2차 인증 수단 (kakao: 카카오 인증) */
    two_factor_type: 'kakao';
}

export interface WithdrawKrw {
    /** 출금의 고유 아이디 */
    uuid: string;
    /** 출금 상태 (PROCESSING: 진행중, DONE: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'DONE' | 'CANCELED';
    /** 출금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 출금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 출금 금액/수량 */
    amount: NumberString;
    /** 출금 수수료 */
    fee: NumberString;
}

export interface WithdrawAllow {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 출금 네트워크 타입 */
    net_type: string;
    /** 출금 네트워크 이름 */
    network_name: string;
    /** 출금 주소 */
    withdraw_address: string;
    /** 2차 출금 주소 (필요한 디지털 자산에 한해서) */
    secondary_address?: string;
    /** 출금 거래소명 (영문) */
    exchange_name?: string;
    /** 주소 소유주 고객 타입 (personal: 개인, corporation: 법인) */
    owner_type?: 'personal' | 'corporation';
    /** 주소 소유주 국문명 */
    owner_ko_name?: string;
    /** 주소 소유주 영문명 */
    owner_en_name?: string;
    /** 주소 소유 법인 국문명 */
    owner_corp_ko_name?: string;
    /** 주소 소유 법인 영문명 */
    owner_corp_en_name?: string;
}

export interface DepositListParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency?: string;
    /** 입금 UUID의 목록 */
    uuids?: string[];
    /** 입금 TXID의 목록 */
    txids?: string[];
    /** 입금 상태 */
    state?:
        | 'REQUESTED_PENDING'
        | 'REQUESTED_SYSTEM_REJECTED'
        | 'REQUESTED_PROCESSING'
        | 'REQUESTED_ADMIN_REJECTED'
        | 'DEPOSIT_PROCESSING'
        | 'DEPOSIT_ACCEPTED'
        | 'DEPOSIT_CANCELLED'
        | 'REFUNDING_PENDING'
        | 'REFUNDING_SYSTEM_REJECTED'
        | 'REFUNDING_PROCESSING'
        | 'REFUNDING_ADMIN_REJECTED'
        | 'REFUNDING_ACCEPTED'
        | 'REFUNDED_PROCESSING'
        | 'REFUNDED_ACCEPTED'
        | 'REFUNDED_CANCELLED';
    /** 페이지 수 (default: 1) */
    page?: number;
    /** 개수 제한 (default: 100, max: 100) */
    limit?: number;
    /** 정렬방식 (asc: 오름차순, desc: 내림차순, default: desc) */
    order_by?: 'asc' | 'desc';
}

export interface SingleDeposit {
    /** 입금의 고유 아이디 */
    uuid: string;
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금 네트워크 */
    net_type: string;
    /** 입금의 트랜잭션 아이디 */
    txid: string;
    /** 입금 상태 */
    state:
        | 'REQUESTED_PENDING'
        | 'REQUESTED_SYSTEM_REJECTED'
        | 'REQUESTED_PROCESSING'
        | 'REQUESTED_ADMIN_REJECTED'
        | 'DEPOSIT_PROCESSING'
        | 'DEPOSIT_ACCEPTED'
        | 'DEPOSIT_CANCELLED'
        | 'REFUNDING_PENDING'
        | 'REFUNDING_SYSTEM_REJECTED'
        | 'REFUNDING_PROCESSING'
        | 'REFUNDING_ADMIN_REJECTED'
        | 'REFUNDING_ACCEPTED'
        | 'REFUNDED_PROCESSING'
        | 'REFUNDED_ACCEPTED'
        | 'REFUNDED_CANCELLED';
    /** 입금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 입금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 입금 수량 */
    amount: NumberString;
    /** 입금 수수료 */
    fee: NumberString;
    /** 입금 유형 (default: 일반입금) */
    transaction_type?: string;
}

export interface DepositKrwListParams {
    /** 입금 상태 (PROCESSING: 진행중, ACCEPTED: 완료, CANCELED: 취소됨) */
    state?: 'PROCESSING' | 'ACCEPTED' | 'CANCELED';
    /** 입금 UUID의 목록 */
    uuids?: string[];
    /** 입금 TXID의 목록 */
    txids?: string[];
    /** 페이지 수 (default: 1) */
    page?: number;
    /** 개수 제한 (default: 100, max: 100) */
    limit?: number;
    /** 정렬방식 (asc: 오름차순, desc: 내림차순, default: desc) */
    order_by?: 'asc' | 'desc';
}

export interface SingleDepositKrw {
    /** 입금의 고유 아이디 */
    uuid: string;
    /** 입금 상태 (PROCESSING: 진행중, ACCEPTED: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'ACCEPTED' | 'CANCELED';
    /** 입금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 입금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 입금 수량 */
    amount: NumberString;
    /** 입금 수수료 */
    fee: NumberString;
    /** 입금 유형 (default: 일반입금) */
    transaction_type?: string;
}

export interface SingleDepositParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금의 고유 아이디 */
    uuid: string;
    /** 입금의 트랜잭션 아이디 */
    txid: string;
}

export interface Deposit {
    /** 입금의 고유 아이디 */
    uuid: string;
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금 네트워크 */
    net_type: string;
    /** 입금의 트랜잭션 아이디 */
    txid: string;
    /** 입금 상태 */
    state:
        | 'REQUESTED_PENDING'
        | 'REQUESTED_SYSTEM_REJECTED'
        | 'REQUESTED_PROCESSING'
        | 'REQUESTED_ADMIN_REJECTED'
        | 'DEPOSIT_PROCESSING'
        | 'DEPOSIT_ACCEPTED'
        | 'DEPOSIT_CANCELLED'
        | 'REFUNDING_PENDING'
        | 'REFUNDING_SYSTEM_REJECTED'
        | 'REFUNDING_PROCESSING'
        | 'REFUNDING_ADMIN_REJECTED'
        | 'REFUNDING_ACCEPTED'
        | 'REFUNDED_PROCESSING'
        | 'REFUNDED_ACCEPTED'
        | 'REFUNDED_CANCELLED';
    /** 입금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 입금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 입금 수량 */
    amount: NumberString;
    /** 입금 수수료 */
    fee: NumberString;
    /** 입금 유형 (default: 일반입금) */
    transaction_type?: string;
}

export interface GenerateCoinAddressParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금 네트워크 */
    net_type: string;
}

export interface CoinAddress {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금 네트워크 */
    net_type: string;
    /** 입금 주소 */
    deposit_address: string;
    /** 2차 입금 주소 (필요한 디지털 자산에 한해서) */
    secondary_address?: string;
}

export interface SingleDepositAddressParams {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입금 네트워크 */
    net_type: string;
}

export interface DepositKrwParams {
    /** 입금액 */
    amount: NumberString;
    /** 2차 인증 수단 (kakao: 카카오 인증) */
    two_factor_type: 'kakao';
}

export interface DepositKrw {
    /** 입금의 고유 아이디 */
    uuid: string;
    /** 입금 상태 (PROCESSING: 진행중, ACCEPTED: 완료, CANCELED: 취소됨) */
    state: 'PROCESSING' | 'ACCEPTED' | 'CANCELED';
    /** 입금 생성 시간 (ISO 8601 형식) */
    created_at: string;
    /** 입금 완료 시간 (ISO 8601 형식) */
    done_at?: string;
    /** 입금 금액/수량 */
    amount: NumberString;
    /** 입금 수수료 */
    fee: NumberString;
    /** 입금 유형 (default: 일반입금) */
    transaction_type?: string;
}

export interface WalletStatus {
    /** 화폐를 의미하는 영문 대문자 코드 */
    currency: string;
    /** 입출금 상태 */
    wallet_state: 'working' | 'withdraw_only' | 'deposit_only' | 'paused';
    /** 블록 상태 */
    block_state: 'normal' | 'delayed' | 'inactive';
    /** 블록 높이 */
    block_height: number;
    /** 블록 갱신 시각 (ISO 8601 형식) */
    block_updated_at: string;
    /** 블록 정보 최종 갱신 후 경과 시간 (분) */
    block_elapsed_minutes: number;
    /** 입출금 관련 요청 시 지정해야 할 네트워크 타입 */
    net_type: string;
    /** 입출금 네트워크 이름 */
    network_name: string;
}

export interface ApiKey {
    /** API 키 */
    access_key: string;
    /** 만료 일시 (ISO 8601 형식) */
    expire_at: string;
}
