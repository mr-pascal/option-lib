import {Position} from "../models/position";
import {BtoSto, Option, PutCall} from "../models/option";

const option = (underlying: string, strike: number, right: PutCall, btoSto: BtoSto, amount: number = 1, multiplier: number = 100): Option => {
    return {
        underlying,
        strike,
        multiplier,
        amount,
        btoSto,
        right
    }
};

const put = (underlying: string, strike: number, btoSto: BtoSto, amount: number = 1, multiplier: number = 100): Option => {
    return option(underlying, strike, PutCall.PUT, btoSto, amount, multiplier);
};

const call = (underlying: string, strike: number, btoSto: BtoSto, amount: number = 1, multiplier: number = 100): Option => {
    return option(underlying, strike, PutCall.CALL, btoSto, amount, multiplier);
};

const shortPut = (underlying: string, strike: number, amount: number = 1, multiplier: number = 100): Option => {
    return put(underlying, strike, BtoSto.STO, amount, multiplier);
};

const longPut = (underlying: string, strike: number, amount: number = 1, multiplier: number = 100): Option => {
    return put(underlying, strike, BtoSto.BTO, amount, multiplier);
};

const shortCall = (underlying: string, strike: number, amount: number = 1, multiplier: number = 100): Option => {
    return call(underlying, strike, BtoSto.STO, amount, multiplier);
};

const longCall = (underlying: string, strike: number, amount: number = 1, multiplier: number = 100): Option => {
    return call(underlying, strike, BtoSto.BTO, amount, multiplier);
};

const strangle = (underlying: string, putStrike: number, callStrike: number, amount: number = 1): Position => {
    return {
        options: [
            shortPut(underlying, putStrike),
            shortCall(underlying, callStrike)
        ],
        amount
    }
};

const putRatioSpread = (underlying: string, longPutStrike: number, shortPutStrike: number,
                        longPutAmount: number, shortPutAmount: number, amount: number = 1): Position => {
    return {
        options: [
            longPut(underlying, longPutStrike, longPutAmount),
            shortPut(underlying, shortPutStrike, shortPutAmount)
        ],
        amount
    }
};

const ironCondor = (underlying: string, shortPutStrike: number, longPutStrike: number,
                    shortCallStrike: number, longCallStrike: number, amount: number = 1): Position => {
    return {
        options: [
            shortPut(underlying, shortPutStrike),
            shortCall(underlying, shortCallStrike),
            longPut(underlying, longPutStrike),
            longCall(underlying, longCallStrike)
        ],
        amount
    }
};

const verticalPutSpread = (underlying: string, longStrike: number, shortStrike: number,
                           amount: number = 1): Position => {
    return verticalSpread(underlying, longStrike, shortStrike, PutCall.PUT, amount);
};

const verticalCallSpread = (underlying: string, longStrike: number, shortStrike: number,
                            amount: number = 1): Position => {
    return verticalSpread(underlying, longStrike, shortStrike, PutCall.CALL, amount);
};

const verticalSpread = (underlying: string, longStrike: number, shortStrike: number,
                        putCall: PutCall, amount: number = 1): Position => {
    return {
        options: [
            option(underlying, longStrike, putCall, BtoSto.BTO),
            option(underlying, shortStrike, putCall, BtoSto.STO),
        ],
        amount
    };

};

export {
    strangle,
    putRatioSpread,
    shortPut,
    shortCall,
    longPut,
    longCall,
    ironCondor,
    verticalCallSpread,
    verticalPutSpread
};
