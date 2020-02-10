import {BtoSto, Option, PutCall, UnderlyingGroupedOptions} from "../models/option";
import {groupBy} from "./utils";

const calculateNotionalValueOption = (options: Option[]): number => {

    if (!options.length) {
        return 0;
    }

    const groupedOptions: UnderlyingGroupedOptions = groupBy(options, 'underlying');

    const notionalValues: { [underlying: string]: number } = {};
    for (let [underlying, optionList] of Object.entries(groupedOptions)) {

        let notionalValuesShortPuts = [];
        let notionalValuesLongPuts = [];
        let notionalValuesShortCalls = [];
        let notionalValuesLongCalls = [];
        for (let option of optionList) {
            if (option.right === PutCall.PUT && option.btoSto === BtoSto.STO) {
                notionalValuesShortPuts.push(getNotionalValueForOption(option));
            } else if (option.right === PutCall.PUT && option.btoSto === BtoSto.BTO) {
                notionalValuesLongPuts.push(getNotionalValueForOption(option));
            } else if (option.right === PutCall.CALL && option.btoSto === BtoSto.STO) {
                notionalValuesShortCalls.push(getNotionalValueForOption(option));
            } else if (option.right === PutCall.CALL && option.btoSto === BtoSto.BTO) {
                notionalValuesLongCalls.push(getNotionalValueForOption(option));
            }
        }
        notionalValuesShortPuts.sort();
        notionalValuesLongPuts.sort();
        notionalValuesShortCalls.sort();
        notionalValuesLongCalls.sort();

        let notionalValuePutSide = 0;
        let notionalValueCallSide = 0;
        let longOptionIndexCounter = notionalValuesLongPuts.length - 1;
        for (let i = notionalValuesShortPuts.length - 1; i >= 0; i--) {
            notionalValuePutSide += notionalValuesShortPuts[i];
            if (longOptionIndexCounter >= 0) {
                notionalValuePutSide -= notionalValuesLongPuts[longOptionIndexCounter];
                longOptionIndexCounter--;
            }
        }

        const effectiveShortPuts = Math.max(notionalValuesShortPuts.length - notionalValuesLongPuts.length, 0);
        const effectiveShortCalls = Math.max(notionalValuesShortCalls.length - notionalValuesLongCalls.length ,0);

        longOptionIndexCounter = notionalValuesLongCalls.length - 1;
        for (let i = notionalValuesShortCalls.length - 1; i >= 0; i--) {
            notionalValueCallSide += notionalValuesShortCalls[i];
            if (longOptionIndexCounter >= 0) {
                notionalValueCallSide -= notionalValuesLongCalls[longOptionIndexCounter];
                longOptionIndexCounter--;
            }
        }
        if(effectiveShortPuts >= effectiveShortCalls) {
            notionalValues[underlying] = notionalValuePutSide;
        } else {
            notionalValues[underlying] = Math.max(notionalValuePutSide, notionalValueCallSide);
        }
    }

    return Math.max(0,
        Object.values(notionalValues)
            .reduce((acc, curr) => acc! + curr!, 0)!
    );
};

const getNotionalValueForOption = (option: Option) => {
    return option.strike * option.multiplier * option.amount;
};



export {calculateNotionalValueOption};
