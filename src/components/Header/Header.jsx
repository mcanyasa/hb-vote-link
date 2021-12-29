import React from "react";

import "./Header.scss";

const Header = () => {
    return (
        <div className="container header" data-testid="header">
            <div className="row">
                <div className="col d-flex align-items-center">
                    <h1 className="header-logo"><span>hepsiburada</span>.com</h1>
                </div>
                <div className="col d-flex align-items-center justify-content-end">
                    <span className="header-text"><span><strong>Link</strong>VOTE</span> Challenge</span> 
                </div>
            </div>
        </div>
    );
};

export default Header;