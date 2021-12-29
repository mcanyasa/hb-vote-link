import React, { createContext, useReducer, useEffect } from "react";

import LinkVoteReducer from "../reducers/LinkVoteReducer.js";

export const LinkVoteContext = createContext();

const LinkVoteContextProvider = props => {
    const initialLinks = props.links ? props.links :
        localStorage.getItem("links") !== null ? JSON.parse(localStorage.getItem("links")) : [];
    const [links, dispatch] = useReducer(LinkVoteReducer, initialLinks);
    const orderBy = localStorage.getItem("orderBy") !== null ? localStorage.getItem("orderBy") : "";
    const setOrderBy = value => {
        localStorage.setItem("orderBy", value);
    };

    useEffect(() => {
        localStorage.setItem("links", JSON.stringify(links));
    }, [links]);

    return (
        <LinkVoteContext.Provider value={{ links, orderBy, setOrderBy, dispatch }}>
            {props.children}
        </LinkVoteContext.Provider>
    );
};

export default LinkVoteContextProvider;