/* eslint-disable @typescript-eslint/no-explicit-any */

type Task<T> = () => Promise<T>;

interface RateWindow {
    startTime: number;
    count: number;
}

interface QueuedTask<T> {
    task: Task<T>;
    resolve: (value: T) => void;
    reject: (error: any) => void;
}

export class RateLimiter {
    private readonly limit: number;
    private readonly interval: number;
    private readonly maxQueueSize: number;

    private currentWindow: RateWindow;
    private nextWindow: RateWindow;
    private queue: QueuedTask<any>[] = [];
    private processing = false;

    constructor(maxRequestsPerSecond: number, interval: number, maxQueueSize: number = 1000) {
        this.limit = maxRequestsPerSecond;
        this.interval = interval;
        this.maxQueueSize = maxQueueSize;

        const now = Date.now();
        this.currentWindow = { startTime: now, count: 0 };
        this.nextWindow = { startTime: now + this.interval, count: 0 };
    }

    private getTimeUntilWindow(window: RateWindow): number {
        return Math.max(0, window.startTime - Date.now());
    }

    private rotateWindowsIfNeeded() {
        const now = Date.now();

        while (now >= this.nextWindow.startTime) {
            this.currentWindow = this.nextWindow;
            this.nextWindow = {
                startTime: this.currentWindow.startTime + this.interval,
                count: 0,
            };
        }
    }

    public async schedule<T>(task: Task<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const queuedTask = { task, resolve, reject };

            if (this.queue.length >= this.maxQueueSize) {
                this.waitForQueueSpace(queuedTask);
            } else {
                this.queue.push(queuedTask);
                this.processQueue();
            }
        });
    }

    private async waitForQueueSpace<T>(queuedTask: QueuedTask<T>) {
        const checkInterval = Math.min(this.interval / 10, 100);

        const waitForSpace = async () => {
            while (this.queue.length >= this.maxQueueSize) {
                await this.sleep(checkInterval);
            }
            this.queue.push(queuedTask);
            this.processQueue();
        };

        waitForSpace();
    }

    private async processQueue() {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;

        try {
            while (this.queue.length > 0) {
                this.rotateWindowsIfNeeded();

                const queuedTask = this.queue.shift()!;

                if (this.currentWindow.count < this.limit) {
                    await this.executeTask(queuedTask);
                } else {
                    const delay = this.getTimeUntilWindow(this.nextWindow);
                    if (delay > 0) {
                        await this.sleep(delay);
                    }

                    this.rotateWindowsIfNeeded();
                    await this.executeTask(queuedTask);
                }
            }
        } finally {
            this.processing = false;
        }
    }

    private async executeTask<T>(queuedTask: QueuedTask<T>) {
        try {
            if (this.currentWindow.count < this.limit) {
                this.currentWindow.count++;
                const result = await queuedTask.task();
                queuedTask.resolve(result);
            } else {
                this.nextWindow.count++;
                const result = await queuedTask.task();
                queuedTask.resolve(result);
            }
        } catch (error) {
            queuedTask.reject(error);
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public getStatus() {
        return {
            currentWindow: { ...this.currentWindow },
            nextWindow: { ...this.nextWindow },
            queueLength: this.queue.length,
            processing: this.processing,
        };
    }

    public async drain(): Promise<void> {
        while (this.queue.length > 0 || this.processing) {
            await this.sleep(10);
        }
    }
}
