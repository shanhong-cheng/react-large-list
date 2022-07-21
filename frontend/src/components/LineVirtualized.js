import React, {useState, useEffect} from 'react';
import { List } from "react-virtualized";
import './LineVirtualized.css';

function LineVirtualized() {

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

  const renderRow = ({ index, key, style }) => (
   <div>
    <div key={key} style={style} className="post">
      <h3>{`${data[index].title}-${data[index].id}`}</h3>
      <p>{data[index].body}</p>
    </div>
   </div>
  )
  return (
    <List
      width={1200}
      height={700}
      rowRenderer={renderRow}
      rowCount={data.length}
      rowHeight={120}
    />
  );
}
export default LineVirtualized;
