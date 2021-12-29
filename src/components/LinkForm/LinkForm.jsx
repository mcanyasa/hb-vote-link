import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import actionTypes from "../../utils/actionTypes.js";
import { LinkVoteContext } from "../../contexts/LinkVoteContext.js";

import "./LinkForm.scss";

const LinkForm = () => {
    const { dispatch, setOrderBy } = useContext(LinkVoteContext);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const handleSubmit = event => {
        event.preventDefault();

        if (name.trim() === "" || url.trim() === "") {
            return;
        }

        dispatch({
            type: actionTypes.ADD_LINK, link: {
                name,
                url
            }
        });

        window.$ && $(".toast").toast({
            delay: 1000
        }).toast("show").on('hidden.bs.toast', function () {
            setName("");
            setUrl("");
            setOrderBy("");
        });
    };

    return (
        <div className="linkForm" data-testid="linkForm">
            <div className="toast" role="alert">
                <div className="toast-body">
                    <strong>{name}</strong> added.
                </div>
            </div>

            <Link className="back" to="/"><i className="fas fa-arrow-left"></i> Return to List</Link>

            <h2>Add New Link</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Link Name:</label>
                    <input name="name" className="form-control" data-testid="name" placeholder="e.g. Alphabet"
                           value={name} onChange={event => setName(event.target.value)} autoComplete="off"/>
                </div>
                <div className="form-group">
                    <label>Link URL:</label>
                    <input name="url" className="form-control" data-testid="url" placeholder="e.g. http://abc.xyz"
                           value={url} onChange={event => setUrl(event.target.value)} autoComplete="off"/>
                </div>
                <div className="add-wrapper"><input type="submit" value="ADD"
                                                    className="btn btn-dark rounded-pill add" data-testid="add"/></div>
            </form>
        </div>
    );
};

export default LinkForm;