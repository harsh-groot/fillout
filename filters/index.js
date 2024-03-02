function applyFilters(itemsToFilter, filters, objectName = "questions") {

    itemsToFilter[objectName] = itemsToFilter[objectName].filter(item =>
        filters?.every(({ id, condition, value }) => {
            switch (condition) {
                case "equals":
                    return item[id] === value;
                case "greater_than":
                    return item[id] > value;
                case "less_than":
                    return item[id] < value;
                case "does_not_equal":
                    return item[id] !== value;

                // Add more cases for other conditions if needed
                default:
                    return true; // Default to true if condition not recognized
            }
        })
    );
    return itemsToFilter;
}

module.exports = applyFilters;