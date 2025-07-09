/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { BithumbApiKeyError, BithumbWSNotConnectedError } from './error';
import { BithumbOptions } from './types';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { WebSocket } from 'ws';
import {
    WSMyAsset,
    WSMyOrder,
    WSMyOrderPayload,
    WSOrderbook,
    WSOrderbookPayload,
    WSTicker,
    WSTickerPayload,
    WSTrade,
    WSTradePayload,
} from './ws-types';

export class BithumbWS {
    private options?: BithumbOptions;

    private publicWs?: WebSocket;
    private privateWs?: WebSocket;

    private subscriptions: Record<string, Function[]> = {};

    constructor(options?: BithumbOptions) {
        this.options = options;
    }

    public async usePublic() {
        this.publicWs = new WebSocket('wss://ws-api.bithumb.com/websocket/v1');

        await this.waitForConnection(this.publicWs);
        this.handleMessages(this.publicWs);
    }

    public async usePrivate() {
        if (!this.options || !this.options.accessKey || !this.options.secretKey) {
            throw new BithumbApiKeyError();
        }

        const payload = {
            access_key: this.options.accessKey,
            nonce: uuidv4(),
            timestamp: Date.now(),
        };

        const jwtToken = jwt.sign(payload, this.options.secretKey);

        this.privateWs = new WebSocket('wss://ws-api.bithumb.com/websocket/v1', {
            headers: {
                authorization: `Bearer ${jwtToken}`,
            },
        });

        await this.waitForConnection(this.privateWs);
        this.handleMessages(this.privateWs);
    }

    public subscribeTicker(payload: WSTickerPayload, cb?: (data: WSTicker) => unknown): void {
        if (!this.publicWs) throw new BithumbWSNotConnectedError();

        const message = [
            {
                ticket: uuidv4(),
            },
            {
                type: 'ticker',
                codes: payload.codes,
                isOnlySanpshot: payload.isOnlySanpshot || false,
                isOnlyRealtime: payload.isOnlyRealtime || false,
            },
            {
                format: 'DEFAULT',
            },
        ];

        this.publicWs.send(JSON.stringify(message));

        if (cb) this.subscribe('ticker', cb);
    }

    public subscribeTrade(payload: WSTradePayload, cb?: (data: WSTrade) => unknown): void {
        if (!this.publicWs) throw new BithumbWSNotConnectedError();

        const message = [
            {
                ticket: uuidv4(),
            },
            {
                type: 'trade',
                codes: payload.codes,
                isOnlySanpshot: payload.isOnlySanpshot || false,
                isOnlyRealtime: payload.isOnlyRealtime || false,
            },
            {
                format: 'DEFAULT',
            },
        ];

        this.publicWs.send(JSON.stringify(message));

        if (cb) this.subscribe('trade', cb);
    }

    public subscribeOrderbook(payload: WSOrderbookPayload, cb?: (data: WSOrderbook) => unknown): void {
        if (!this.publicWs) throw new BithumbWSNotConnectedError();

        const message = [
            {
                ticket: uuidv4(),
            },
            {
                type: 'orderbook',
                codes: payload.codes,
                level: payload.level || 1,
                isOnlySanpshot: payload.isOnlySanpshot || false,
                isOnlyRealtime: payload.isOnlyRealtime || false,
            },
            {
                format: 'DEFAULT',
            },
        ];

        this.publicWs.send(JSON.stringify(message));

        if (cb) this.subscribe('orderbook', cb);
    }

    public subscribeMyOrder(payload: WSMyOrderPayload, cb?: (data: WSMyOrder) => unknown): void {
        if (!this.privateWs) throw new BithumbWSNotConnectedError();

        const message = [
            {
                ticket: uuidv4(),
            },
            {
                type: 'myOrder',
                codes: payload.codes,
            },
            {
                format: 'DEFAULT',
            },
        ];

        this.privateWs.send(JSON.stringify(message));

        if (cb) this.subscribe('ticker', cb);
    }

    public subscribeMyAsset(cb?: (data: WSMyAsset) => unknown): void {
        if (!this.privateWs) throw new BithumbWSNotConnectedError();

        const message = [
            {
                ticket: uuidv4(),
            },
            {
                type: 'myAsset',
            },
            {
                format: 'DEFAULT',
            },
        ];

        this.privateWs.send(JSON.stringify(message));

        if (cb) this.subscribe('ticker', cb);
    }

    private waitForConnection(ws: WebSocket): Promise<void> {
        return new Promise((resolve, reject) => {
            ws.on('open', () => resolve());
            ws.on('error', error => reject(error));
            ws.on('close', () => reject(new Error('WebSocket connection closed')));
        });
    }

    private handleMessages(ws: WebSocket): void {
        ws.on('message', (data: string) => {
            const parsedData = JSON.parse(data);
            const type = parsedData.type;

            if (this.subscriptions[type]) {
                this.subscriptions[type].forEach(callback => callback(parsedData));
            }
        });
    }

    private subscribe(type: string, cb: Function): void {
        if (!this.publicWs) throw new BithumbWSNotConnectedError();

        if (!this.subscriptions[type]) {
            this.subscriptions[type] = [];
        }

        this.subscriptions[type].push(cb);
    }
}
