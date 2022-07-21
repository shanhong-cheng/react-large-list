import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from "react-window";
import './LineWindow.css';

function LineWindow() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/conversation/lines?limit=1000", {    
      headers: {
      'Content-Type': 'application/json'
    },})
    .then(response => response.json())
    .then(function(json) {
      const { data, totalLines, rowsPerPage } = json;
      
      setData(data);
    })
  },[])

  const Row = ({ index, key, style }) => (
   <div>
    <div key={key} style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
   </div>
  )
  return (
    <List
      width={1400}
      height={700}
      itemCount={data.length}
      itemSize={120}
    >
      {Row}
    </List>
  );
}
export default LineWindow;
