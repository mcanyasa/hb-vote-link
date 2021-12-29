import { getSortedList, vote } from "../utils/helpers.js";
import actionTypes from "../utils/actionTypes.js";

const LinkVoteReducer = (state, action) => {
    let list;

    switch (action.type) {
        case actionTypes.ADD_LINK:
            return [{
                name: action.link.name,
                url: action.link.url,
                counter: 0,
                id: (new Date()).getTime()
            }, ...state];
        case actionTypes.REMOVE_LINK:
            return state.filter(link => link.id !== action.id);
        case actionTypes.UP_VOTE:
            list = vote(state, action.id, "up");

            return getSortedList(list, action.orderBy);
        case actionTypes.DOWN_VOTE:
            list = vote(state, action.id, "down");

            return getSortedList(list, action.orderBy);
        case actionTypes.ORDER_BY_ASC:
            return getSortedList(state, "asc");
        case actionTypes.ORDER_BY_DESC:
            return getSortedList(state, "desc");
        case actionTypes.ORDER_BY_DEFAULT:
            return getSortedList(state);
        default:
            return state;
    }
};

export default LinkVoteReducer;