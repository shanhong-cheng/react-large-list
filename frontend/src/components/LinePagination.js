import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './LinePagination.css';
function LinePagination() {
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: []
  });
  useEffect(() => {
    setPagination((prevState) => ({
      ...prevState,
      pageCount: prevState.data.length / prevState.numberPerPage,
      currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
    }))
  }, [pagination.numberPerPage, pagination.offset]);
  const handlePageClick = event => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage
    setPagination({ ...pagination, offset })
  }

  useEffect(() => {
    fetch("http://localhost:3000/conversation/lines?limit=1000", {    
      headers: {
      'Content-Type': 'application/json'
    },})
    .then(response => response.json())
    .then(function(json) {
      const { data, totalLines, rowsPerPage } = json;
      
      setPagination((prevState) => ({
        ...prevState,
        data,
        pageCount: data.length / prevState.numberPerPage,
        currentData: data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
      }))
    })
  },[])
  return (
    <div>
      {pagination.currentData && pagination.currentData.map(((item, index) => (
        <div key={item.id} className="post">
          <h3>{`${item.title} - ${item.id}`}</h3>
          <p>{item.body}</p>
        </div>
      )))
      }
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pagination.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
export default LinePagination;
