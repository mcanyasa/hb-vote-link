import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import LinkVoteContextProvider, { LinkVoteContext } from "../contexts/LinkVoteContext.js";

export const renderWithContextAndRouter = (component, initialData = {}) => {
    const history = createMemoryHistory();

    return {
        ...render(
            <LinkVoteContextProvider value={LinkVoteContext} {...initialData}>
                <Router history={history}>
                    {component}
                </Router>
            </LinkVoteContextProvider>
        )
    };
};