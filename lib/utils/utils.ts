

const groupBy = (array: any[], groupByProperty: string) => {
    return array.reduce((acc, curr) => {
        const val: any = curr[groupByProperty];

        if(!acc[val]) {
            acc[val] = [];
        }
        acc[val].push(curr);
        return acc;
    }, {});
};




export {groupBy};
