export const getSortedList = (list, type = "") => {
    list.sort((a, b) => {
        let returnValue = 0;

        if (type === "") {
            if (a.id < b.id) returnValue = 1;
            if (a.id > b.id) returnValue = -1;

            return returnValue;
        }

        if (a.counter < b.counter) returnValue = -1;
        if (a.counter > b.counter) returnValue = 1;

        if (returnValue !== 0) {
            if (type === "desc") {
                return returnValue * -1;
            }

            return returnValue;
        }

        if (a.id < b.id) returnValue = 1;
        if (a.id > b.id) returnValue = -1;

        return returnValue;
    });

    return [...list];
};

export const vote = (state, id, type) => {
    return state.map(link => {
        if (link.id !== id) {
            return link;
        }

        if (type === "up") {
            link.counter++;
        } else {
            link.counter--;
        }

        return link;
    });
};