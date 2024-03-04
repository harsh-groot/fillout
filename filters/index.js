function applyFilters(itemsToFilter, filters) {

    const predicates = {
        equals: (key, value) => (obj) => {
            if (obj.type == "DatePicker" && isValiDate(obj.value) && isValiDate(value)) {

                return parseInt(new Date(obj.value).getTime()) === parseInt(new Date(value).getTime());
            }
            else {

                return obj.value == value;
            }
        },
        gte: (key, value) => (obj) => {
            if (obj.type == "DatePicker" && isValiDate(obj.value) && isValiDate(value)) {
                return new Date(obj.value).getTime() >= new Date(value).getTime();
            }
            else if (!isNaN(obj.value) && !isNaN(value)) {
                return obj.value >= value;
            }
            return false;
        },
        lte: (key, value) => (obj) => {
            if (obj.type == "DatePicker" && isValiDate(obj.value) && isValiDate(value)) {
                return new Date(obj.value).getTime() <= new Date(value).getTime();
            }
            else if (!isNaN(obj.value)) {
                return obj.value <= value;
            }
            return false;
        },
    };

    const filteredConditions = filters.map(({ condition, id, value }) => predicates[condition](id, value));

    let result = [];
    for (const condition1 of filteredConditions) {
        const filteredItems = itemsToFilter.filter(condition1);
        if (filteredItems.length > 0) {
            result = [...result, ...filteredItems];
        } else {
            // If any condition fails, break out of the loop
            result = [];
            break;
        }
    }

    return result;
}
function isValiDate(value) {
    return value instanceof Date && value instanceof Date && !isNaN(new Date(value).getTime())
}
module.exports = applyFilters;