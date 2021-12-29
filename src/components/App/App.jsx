import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "../Header/Header.jsx";
import LinkList from "../LinkList/LinkList.jsx";
import LinkForm from "../LinkForm/LinkForm.jsx";

import "./App.scss";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container" data-testid="container">
                <div className="row">
                    <div className="col">
                        <Header/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Switch>
                            <Route exact path="/" component={LinkList}/>
                            <Route path="/new" component={LinkForm}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;