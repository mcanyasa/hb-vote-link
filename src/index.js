import React from "react";
import ReactDOM from "react-dom";

import LinkVoteContextProvider from "./contexts/LinkVoteContext.js";

import App from "./components/App/App.jsx";

ReactDOM.render(
    <LinkVoteContextProvider><App/></LinkVoteContextProvider>,
    document.querySelector("#root")
);