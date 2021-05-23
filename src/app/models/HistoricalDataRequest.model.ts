export class HistoricalDataRequestModel {
    public symbol: string;
    public range: string;
    public interval: string;

    constructor(symbol?: string, range?: string, interval?: string) {
        this.symbol = symbol;
        this.range = range;
        this.interval = interval;
    }
}