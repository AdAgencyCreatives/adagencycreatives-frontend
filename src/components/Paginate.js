const Paginate = ({ meta, paginate, title }) => {
    return (
        <div className="row mt-3">
            <div className="col-12">
                <p className="user-count">
                    Viewing {meta.from} - {meta.to} of {meta.total} {title?.length > 0 ? title : "records"}
                </p>
                <div className="user-pagination">
                    <nav>
                        <ul className="pagination">
                            <li className={"page-item" + (meta.current_page == 1 ? " disabled" : "")} onClick={() => (meta.current_page == 1 ? void (0) : paginate(meta.current_page - 1))}>
                                <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {Array.apply(null, { length: meta.last_page }).map((item, index) => (
                                <li className={"page-item " + (meta.current_page == index + 1 ? "active" : "")} onClick={() => paginate(index + 1)} key={"page" + index}>
                                    <a className="page-link" href="javascript:void(0)" aria-label={"Page " + (index + 1)}>
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={"page-item" + (meta.current_page == meta.last_page ? " disabled" : "")} onClick={() => (meta.current_page == meta.last_page ? void (0) : paginate(meta.current_page + 1))}>
                                <a className="page-link" href="javascript:void(0)" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};
export default Paginate;