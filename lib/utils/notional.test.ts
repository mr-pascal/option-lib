import {calculateNotionalValueForPositions, calculateNotionalValueOption} from './notional';
import {Option} from "../models/option";
import {Position} from "../models/position";
import {ironCondor, putRatioSpread, shortPut, strangle, verticalPutSpread} from "./optionFactory";

test('get notional value of short put to equal $5k', () => {
    const option: Option = shortPut('IWM', 50);
    expect(calculateNotionalValueOption([option])).toBe(5000);
});
test('get notional value of Bull Put Spread to equal $500', () => {
    const combo: Position = verticalPutSpread('IWM', 95, 100);
    expect(calculateNotionalValueOption(combo.options)).toBe(500);
});
test('get notional value of Bear Put Spread to equal $0', () => {
    const combo: Position = verticalPutSpread('IWM', 100, 95);
    expect(calculateNotionalValueOption(combo.options)).toBe(0);
});
test('get notional value of Put Ratio Spread to equal $9k', () => {
    const combo: Position = putRatioSpread('IWM', 100, 95, 1, 2);
    expect(calculateNotionalValueOption(combo.options)).toBe(9000);
});
test('get notional value of Strangle to equal $10k', () => {
    const combo: Position = strangle('IWM', 100, 150);
    expect(calculateNotionalValueOption(combo.options)).toBe(10000);
});
test('get notional value of Iron Condor to equal $500', () => {
    const combo: Position = ironCondor('IWM', 100, 95, 120, 125);
    expect(calculateNotionalValueOption(combo.options)).toBe(500);

});

test('get notional value of complex portfolio to equal $20k', () => {
    const combos: Position[] = [
        verticalPutSpread('IWM', 95, 100),
        putRatioSpread('IWM', 100, 95, 1, 2),
        strangle('IWM', 100, 150),
        ironCondor('IWM', 100, 95, 120, 125)
    ];
    expect(calculateNotionalValueForPositions(combos)).toBe(20000);

});
