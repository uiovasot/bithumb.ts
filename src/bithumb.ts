import type {
    Account,
    ApiError,
    BithumbOptions,
    CancelOrder,
    CancelOrderParams,
    CommonCandleParams,
    DayCandle,
    DayCandleParams,
    Deposit,
    CoinAddress,
    DepositKrwListParams,
    DepositListParams,
    GenerateCoinAddressParams,
    Market,
    MinuteCandle,
    MinuteCandleParams,
    Order,
    OrderBook,
    OrderBookParams,
    OrderChance,
    OrderChanceParams,
    OrderListParams,
    OrderV2,
    OrderParams,
    SingleDeposit,
    SingleDepositKrw,
    SingleDepositParams,
    SingleOrder,
    SingleOrderParams,
    SingleWithdraw,
    SingleWithdrawParams,
    Ticker,
    TickerParams,
    TradeTick,
    TradeTickParams,
    VirtualAssetWarning,
    WeekMonthCandle,
    Withdraw,
    WithdrawAllow,
    WithdrawChance,
    WithdrawChanceParams,
    WithdrawCoin,
    WithdrawCoinParams,
    WithdrawKrw,
    WithdrawKrwListParams,
    WithdrawKrwParams,
    WithdrawListParams,
    WthdrawKrw,
    SingleDepositAddressParams,
    DepositKrwParams,
    DepositKrw,
    WalletStatus,
    ApiKey,
} from './types';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { BithumbApiError, BithumbApiKeyError } from './error.js';
import crypto from 'crypto';
import { RateLimiter } from './rate-limiter';

export class Bithumb {
    static readonly API_VERSION = 'v2.1.5';

    private options?: BithumbOptions;

    private publicRateLimiter = new RateLimiter(150 - 20, 1000);
    private privateRateLimiter = new RateLimiter(140 - 20, 1000);

    constructor(options?: BithumbOptions) {
        if (options) {
            this.options = options;
        }
    }

    public async getAllMarkets(isDetails: boolean = true): Promise<Market<typeof isDetails>[]> {
        const response = await this.publicRateLimiter.schedule(() =>
            fetch(`https://api.bithumb.com/v1/market/all?isDetails=${isDetails ? 'true' : 'false'}`, {
                headers: { accept: 'application/json' },
            })
        );

        const data: Market<typeof isDetails>[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getMinuteCandles({ unit = 1, market, to, count }: MinuteCandleParams): Promise<MinuteCandle[]> {
        const url = new URL(`https://api.bithumb.com/v1/candles/minutes/${unit}`);

        url.searchParams.append('market', market);

        if (to) {
            url.searchParams.append('to', this.toKSTISOString(to));
        }

        if (count) {
            url.searchParams.append('count', count.toString());
        }

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: MinuteCandle[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDayCandles({ market, to, count, convertingPriceUnit }: DayCandleParams): Promise<DayCandle[]> {
        const url = new URL(`https://api.bithumb.com/v1/candles/days`);

        url.searchParams.append('market', market);

        if (to) {
            url.searchParams.append('to', this.toKSTISOString(to));
        }

        if (count) {
            url.searchParams.append('count', count.toString());
        }

        if (convertingPriceUnit) {
            url.searchParams.append('convertingPriceUnit', convertingPriceUnit);
        }

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: DayCandle[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWeekCandles({ market, to, count }: CommonCandleParams): Promise<WeekMonthCandle[]> {
        const url = new URL(`https://api.bithumb.com/v1/candles/weeks`);

        url.searchParams.append('market', market);

        if (to) {
            url.searchParams.append('to', this.toKSTISOString(to));
        }

        if (count) {
            url.searchParams.append('count', count.toString());
        }

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: WeekMonthCandle[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getMonthCandles({ market, to, count }: CommonCandleParams): Promise<WeekMonthCandle[]> {
        const url = new URL(`https://api.bithumb.com/v1/candles/months`);

        url.searchParams.append('market', market);

        if (to) {
            url.searchParams.append('to', this.toKSTISOString(to));
        }

        if (count) {
            url.searchParams.append('count', count.toString());
        }

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: WeekMonthCandle[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getTradeTicks({ market, to, count, cursor, daysAgo }: TradeTickParams): Promise<TradeTick[]> {
        const url = new URL(`https://api.bithumb.com/v1/trades/ticks`);

        url.searchParams.append('market', market);

        if (to) {
            url.searchParams.append('to', this.toKSTISOString(to));
        }

        if (count) {
            url.searchParams.append('count', count.toString());
        }

        if (cursor) {
            url.searchParams.append('cursor', cursor);
        }

        if (daysAgo) {
            url.searchParams.append('daysAgo', daysAgo.toString());
        }

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: TradeTick[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getTicker({ markets }: TickerParams): Promise<Ticker[]> {
        const url = new URL(`https://api.bithumb.com/v1/ticker`);

        url.searchParams.append('markets', markets.join(','));

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: Ticker[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getOrderBook({ markets }: OrderBookParams): Promise<OrderBook[]> {
        const url = new URL(`https://api.bithumb.com/v1/orderbook`);

        url.searchParams.append('markets', markets.join(','));

        const response = await this.publicRateLimiter.schedule(() =>
            fetch(url.toString(), {
                headers: { accept: 'application/json' },
            })
        );

        const data: OrderBook[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getVirtualAssetWarning(): Promise<VirtualAssetWarning> {
        const response = await this.publicRateLimiter.schedule(() =>
            fetch(`https://api.bithumb.com/v1/market/virtual_asset_warning`, {
                headers: { accept: 'application/json' },
            })
        );

        const data: VirtualAssetWarning | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getAllAccounts(): Promise<Account[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const token = jwt.sign(payload, this.options.secretKey);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(`https://api.bithumb.com/v1/accounts`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: Account[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getOrderChance({ market }: OrderChanceParams): Promise<OrderChance> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/orders/chance`);

        url.searchParams.append('market', market);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: OrderChance | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getOrder({ uuid }: SingleOrderParams): Promise<SingleOrder> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/order`);

        url.searchParams.append('uuid', uuid);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: SingleOrder | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getOrderList(params: OrderListParams): Promise<Order[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/orders`);

        if (params.market) url.searchParams.append('market', params.market);
        if (params.uuids) {
            for (const uuid of params.uuids) url.searchParams.append('uuids[]', uuid);
        }
        if (params.state) url.searchParams.append('state', params.state);
        if (params.states) {
            for (const state of params.states) url.searchParams.append('states[]', state);
        }
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.limit) url.searchParams.append('limit', params.limit.toString());
        if (params.order_by) url.searchParams.append('market', params.order_by);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: Order[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async order(params: OrderParams): Promise<OrderV2> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v2/orders`);

        const searchParams = new URLSearchParams();

        searchParams.append('market', params.market);
        searchParams.append('side', params.side);
        searchParams.append('order_type', params.order_type);
        searchParams.append('price', params.price);
        searchParams.append('volume', params.volume);

        const token = this.getToken(searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                method: 'POST',
                body: searchParams.toString(),
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: OrderV2 | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async cancelOrder(params: CancelOrderParams): Promise<CancelOrder> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v2/orders`);

        const searchParams = new URLSearchParams();

        searchParams.append('order_id', params.order_id);

        const token = this.getToken(searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                method: 'DELETE',
                body: searchParams.toString(),
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: CancelOrder | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWithdrawList(params: WithdrawListParams): Promise<Withdraw[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraws`);

        if (params.currency) url.searchParams.append('currency', params.currency);
        if (params.uuids) {
            for (const uuid of params.uuids) url.searchParams.append('uuids[]', uuid);
        }
        if (params.txids) {
            for (const txid of params.txids) url.searchParams.append('txids[]', txid);
        }
        if (params.state) url.searchParams.append('state', params.state);
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.limit) url.searchParams.append('limit', params.limit.toString());
        if (params.order_by) url.searchParams.append('market', params.order_by);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: Withdraw[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWithdrawKrwList(params: WithdrawKrwListParams): Promise<WithdrawKrw[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraws/krw`);

        if (params.uuids) {
            for (const uuid of params.uuids) url.searchParams.append('uuids[]', uuid);
        }
        if (params.txids) {
            for (const txid of params.txids) url.searchParams.append('txids[]', txid);
        }
        if (params.state) url.searchParams.append('state', params.state);
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.limit) url.searchParams.append('limit', params.limit.toString());
        if (params.order_by) url.searchParams.append('market', params.order_by);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WthdrawKrw[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWithdraw(params: SingleWithdrawParams): Promise<SingleWithdraw> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraw`);

        url.searchParams.append('currency', params.currency);
        url.searchParams.append('uuid', params.uuid);
        url.searchParams.append('txid', params.txid);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: SingleWithdraw | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWithdrawChance(params: WithdrawChanceParams): Promise<WithdrawChance> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraws/chance`);

        url.searchParams.append('currency', params.currency);
        url.searchParams.append('net_type', params.net_type);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WithdrawChance | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async withdrawCoin(params: WithdrawCoinParams): Promise<WithdrawCoin> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraws/coin`);

        const searchParams = new URLSearchParams();

        searchParams.append('currency', params.currency);
        searchParams.append('net_type', params.net_type);
        searchParams.append('amount', params.amount.toString());
        searchParams.append('address', params.address);
        if (params.secondary_address) searchParams.append('secondary_address', params.secondary_address);
        if (params.receiver_type) searchParams.append('receiver_type', params.receiver_type);
        if (params.receiver_ko_name) searchParams.append('receiver_ko_name', params.receiver_ko_name);
        if (params.receiver_en_name) searchParams.append('receiver_en_name', params.receiver_en_name);
        if (params.receiver_corp_ko_name) searchParams.append('receiver_corp_ko_name', params.receiver_corp_ko_name);
        if (params.receiver_corp_en_name) searchParams.append('receiver_corp_en_name', params.receiver_corp_en_name);

        const token = this.getToken(searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                method: 'POST',
                body: searchParams.toString(),
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WithdrawCoin | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async withdrawKrw(params: WithdrawKrwParams): Promise<WithdrawKrw> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/withdraws/krw`);

        const searchParams = new URLSearchParams();

        searchParams.append('amount', params.amount);
        searchParams.append('two_factor_type', params.two_factor_type);

        const token = this.getToken(searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                method: 'POST',
                body: searchParams.toString(),
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WithdrawKrw | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWithdrawCoinAddresses(): Promise<WithdrawAllow[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const token = jwt.sign(payload, this.options.secretKey);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(`https://api.bithumb.com/v1/withdraws/coin_addresses`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WithdrawAllow[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDepositList(params: DepositListParams): Promise<SingleDeposit[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits`);

        if (params.currency) url.searchParams.append('currency', params.currency);
        if (params.uuids) {
            for (const uuid of params.uuids) url.searchParams.append('uuids[]', uuid);
        }
        if (params.txids) {
            for (const txid of params.txids) url.searchParams.append('txids[]', txid);
        }
        if (params.state) url.searchParams.append('state', params.state);
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.limit) url.searchParams.append('limit', params.limit.toString());
        if (params.order_by) url.searchParams.append('market', params.order_by);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: SingleDeposit[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDepositKrwList(params: DepositKrwListParams): Promise<SingleDepositKrw[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits/krw`);

        if (params.uuids) {
            for (const uuid of params.uuids) url.searchParams.append('uuids[]', uuid);
        }
        if (params.txids) {
            for (const txid of params.txids) url.searchParams.append('txids[]', txid);
        }
        if (params.state) url.searchParams.append('state', params.state);
        if (params.page) url.searchParams.append('page', params.page.toString());
        if (params.limit) url.searchParams.append('limit', params.limit.toString());
        if (params.order_by) url.searchParams.append('market', params.order_by);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: SingleDepositKrw[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDeposit(params: SingleDepositParams): Promise<Deposit> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposit`);

        url.searchParams.append('currency', params.currency);
        url.searchParams.append('uuid', params.uuid);
        url.searchParams.append('txid', params.txid);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: Deposit | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async generateCoinAddress(params: GenerateCoinAddressParams): Promise<CoinAddress> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits/generate_coin_address`);

        url.searchParams.append('currency', params.currency);
        url.searchParams.append('net_type', params.net_type);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: CoinAddress | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDepositCoinAddresses(): Promise<CoinAddress[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits/coin_addresses`);

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const token = jwt.sign(payload, this.options.secretKey);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: CoinAddress[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getDepositCoinAddress(params: SingleDepositAddressParams): Promise<CoinAddress[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits/coin_address`);

        url.searchParams.append('currency', params.currency);
        url.searchParams.append('net_type', params.net_type);

        const token = this.getToken(url.searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: CoinAddress[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async depositKrw(params: DepositKrwParams): Promise<DepositKrw> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/deposits/krw`);

        const searchParams = new URLSearchParams();

        searchParams.append('amount', params.amount);
        searchParams.append('two_factor_type', params.two_factor_type);

        const token = this.getToken(searchParams);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                method: 'POST',
                body: searchParams.toString(),
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: DepositKrw | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getWalletStatus(): Promise<WalletStatus[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/status/wallet`);

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const token = jwt.sign(payload, this.options.secretKey);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: WalletStatus[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    public async getApiKeys(): Promise<ApiKey[]> {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const url = new URL(`https://api.bithumb.com/v1/api_keys`);

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const token = jwt.sign(payload, this.options.secretKey);

        const response = await this.privateRateLimiter.schedule(() =>
            fetch(url, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
        );

        const data: ApiKey[] | ApiError = await response.json();

        if ('error' in data) {
            throw BithumbApiError.fromApiError(data);
        }

        return data;
    }

    private getToken(searchParams: URLSearchParams): string {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const alg = 'SHA512';
        const hash = crypto.createHash(alg);
        const queryHash = hash.update(searchParams.toString(), 'utf-8').digest('hex');

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
            query_hash: queryHash,
            query_hash_alg: alg,
        };

        return jwt.sign(payload, this.options.secretKey);
    }

    private toKSTISOString(input: number | string | Date) {
        const date = new Date(input);

        const kstOffset = 9 * 60; // 540
        const kstDate = new Date(date.getTime() + kstOffset * 60 * 1000);

        return kstDate.toISOString().split('.')[0];
    }
}
