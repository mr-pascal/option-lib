import {groupBy} from "./utils";


const obj1 = {
    underlying: 'IWM',
    strike: 55
};
const obj2 = {
    underlying: 'IWM',
    strike: 55
};
const obj3 = {
    underlying: 'SPY',
    strike: 120
};

test('should group by "underlying"', () => {
    const expectedObject = {
        'IWM': [obj1, obj2],
        'SPY': [obj3]
    };
    const result = groupBy([obj1,obj2,obj3], 'underlying');
    expect(result).toEqual(expectedObject)
});
