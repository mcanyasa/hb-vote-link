import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import actionTypes from "../../utils/actionTypes.js";
import { LinkVoteContext } from "../../contexts/LinkVoteContext.js";

import LinkDetail from "../LinkDetail/LinkDetail.jsx"; 

import "./LinkList.scss";

const LinkList = () => {
    const {
        links,
        orderBy,
        setOrderBy,
        dispatch
    } = useContext(LinkVoteContext);
    const itemsPerPage = 5;
    const totalPage = Math.ceil(links.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [item, setItem] = useState({});
    const [removedItem, setRemovedItem] = useState({});
    const indexOfLastPos = currentPage * itemsPerPage;
    const indexOfFirstPos = indexOfLastPos - itemsPerPage;
    const currentLinks = links.slice(indexOfFirstPos, indexOfLastPos);
    const handleChange = event => {
        const value = event.target.value;
        let type;

        switch (value) {
            case "asc":
                type = actionTypes.ORDER_BY_ASC;
                break;
            case "desc":
                type = actionTypes.ORDER_BY_DESC;
                break;
            default:
                type = actionTypes.ORDER_BY_DEFAULT;
        }

        dispatch({ type });
        setOrderBy(value);
        setCurrentPage(1);
    };
    const onRemove = item => {
        setItem(item);
        $("#removeModal").modal("show");
    };
    const removeItem = () => {
        dispatch({ type: actionTypes.REMOVE_LINK, id: item.id });
        setRemovedItem(item);
        $(".toast").toast({
            delay: 1000
        }).toast("show");
    };
    const Pagination = () => {
        if (totalPage === 1) {
            return null;
        }

        return (
            <nav className="pagination-wrapper" aria-label="Page navigation example">
                <ul className="pagination">
                    {totalPage > 1 && (
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link" href={void (0)} aria-label="Previous"
                               onClick={() => setCurrentPage(currentPage - 1)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                    )}
                    {[...Array(totalPage).keys()].map(value => {
                        value++;

                        return (
                            <li className={`page-item ${currentPage === value ? "active" : ""}`} key={value}
                                onClick={() => setCurrentPage(value)}><a className="page-link"
                                                                         href={void (0)}>{value}</a></li>
                        );
                    })}
                    {totalPage > 1 && (
                        <li className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}>
                            <a className="page-link" href={void (0)} aria-label="Next"
                               onClick={() => setCurrentPage(currentPage + 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };
    const Toast = () => {
        if (removedItem.name === "") {
            return null;
        }

        return (
            <div className="toast" role="alert">
                <div className="toast-body">
                    <strong>{removedItem.name}</strong> removed.
                </div>
            </div>
        );
    };
    const Modal = () => {
        if (item.name === "") {
            return null;
        }

        return (
            <div className="modal fade" id="removeModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Remove Link</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-text1">Do you want to remove:</div>
                            <div className="modal-text2">{item.name}</div>
                            <div className="modal-buttons">
                                <button type="button" className="btn btn-dark rounded-pill" onClick={removeItem}
                                        data-dismiss="modal">OK</button>
                                <button type="button" className="btn btn-dark rounded-pill"
                                        data-dismiss="modal">CANCEL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="linkList">
            <Toast/>
            <Modal/>
            <Link to="/new"><div className="addLink" data-testid="addLink">SUBMIT A LINK</div></Link>
            <div className="linkList-content" data-testid="linkList-content">
                <div className="form-group select-wrapper">
                    <select className="form-control" data-testid="select" onChange={handleChange} value={orderBy}>
                        <option value="">Order by</option>
                        <option value="desc">Most Voted (Z -{">"} A)</option>
                        <option value="asc">Less Voted (A -{">"} Z)</option>
                    </select>
                </div>
                <div className="list" data-testid="list">
                    {currentLinks.map(link => (
                        <LinkDetail link={link} onRemove={onRemove} key={link.id}/>
                    ))}
                </div>
            </div>
            <Pagination/>
        </div>
    );
};

export default LinkList;