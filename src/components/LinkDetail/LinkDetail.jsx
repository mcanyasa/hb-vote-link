import React, { useContext } from "react";

import actionTypes from "../../utils/actionTypes.js";
import { LinkVoteContext } from "../../contexts/LinkVoteContext.js";

import "./LinkDetail.scss";

const LinkDetail = ({ link, onRemove }) => {
    const {
        dispatch,
        orderBy
    } = useContext(LinkVoteContext);

    return (
        <div className="list-item" data-id={link.id}>
            <div>
                <div className="point-wrapper">
                    <strong>{link.counter}</strong>
                    <span>VOTES</span> 
                </div>
            </div>
            <div className="item-detail">
                <div className="item-name">{link.name}</div>
                <div className="item-url">(<a href={link.url} target="_blank">{link.url}</a>)</div>
                <a className="up" onClick={() => dispatch({ type: actionTypes.UP_VOTE, id: link.id, orderBy })}
                   data-testid="up" href={void(0)}><i className="fas fa-arrow-up"></i> Up Vote</a>
                <a className="down" onClick={() => dispatch({ type: actionTypes.DOWN_VOTE, id: link.id, orderBy })}
                   data-testid="down" href={void(0)}><i className="fas fa-arrow-down"></i> Up Down</a>
                <a className="remove" onClick={() => onRemove(link)}
                   data-testid="remove" href={void(0)}><i className="fas fa-minus-circle"></i></a>
            </div>
        </div>
    );
};

export default LinkDetail;