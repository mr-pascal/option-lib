export interface Option {

    underlying: string;
    right: PutCall;
    btoSto: BtoSto;
    strike: number;
    multiplier: number;
    amount: number;
}

export interface UnderlyingGroupedOptions {
    [underlying: string] : Option[];
}

export enum BtoSto {
    BTO,
    STO
}

export enum PutCall {
    PUT,
    CALL
}
