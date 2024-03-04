function applyFilters(itemsToFilter, filters, objectName = "questions") {
    var list = itemsToFilter[objectName];
    return list.filter(item => {
        let passesAllFilters = false;
        for (const { id, condition, value } of filters) {
            if (item["id"] == id) {
                switch (condition) {
                    case "equals":
                        if (item["value"] == value) {
                            passesAllFilters = true;
                        }
                        break;
                    case "greater_than":
                        if (item["value"] > value) {
                            passesAllFilters = true;
                        }
                        break;
                    case "less_than":
                        if (item["value"] < value) {
                            passesAllFilters = true;
                        }
                        break;
                    case "does_not_equal":
                        if (item["value"] !== value) {
                            passesAllFilters = true;
                        }
                        break;
                    // Add more cases for other conditions if needed
                }
            }

            // If the item fails any condition, no need to check further, exit the loop
            if (passesAllFilters) {
                break;
            }
        }

        // Return true only if the item passes all filter conditions
        return passesAllFilters;
    });
}

module.exports = applyFilters;