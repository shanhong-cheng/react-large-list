import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './LineInfiniteScroll.css';

function LineInfiniteScroll() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState({
    prev: 0,
    next: 10
  })
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(data.slice(count.prev, count.next))
  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)))
    }, 2000)
    setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
  }

  useEffect(() => {
    fetch("http://localhost:3000/conversation/lines?limit=1000", {    
      headers: {
      'Content-Type': 'application/json'
    },})
    .then(response => response.json())
    .then(function(json) {
      const { data, totalLines, rowsPerPage } = json;
      
      setData(data);
      setCurrent(data.slice(count.prev, count.next));
    })
  },[])

  return (
    <InfiniteScroll
      dataLength={current.length}
      next={getMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div>
        {current && current.map(((item, index) => (
          <div key={index} className="post">
            <h3>{`${item.title}-${item.id}`}</h3>
            <p>{item.body}</p>
          </div>
        )))
        }
      </div>
    </InfiniteScroll>
  );
}
export default LineInfiniteScroll;
