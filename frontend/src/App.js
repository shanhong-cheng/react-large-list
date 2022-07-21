import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import LinePagination from './components/LinePagination';
import LineInfiniteScroll from './components/LineInfiniteScroll';
import LineVirtualized from './components/LineVirtualized';
import LineWindow from './components/LineWindow';
function App() {

  return (
    <Tabs>
    <TabList>
      <Tab>Pagination</Tab>
      <Tab>Infinite Scroll</Tab>
      <Tab>Virtualized</Tab>
      <Tab>Window</Tab>
    </TabList>

    <TabPanel>
      <LinePagination />
    </TabPanel>
    <TabPanel>
      <LineInfiniteScroll />
    </TabPanel>
    <TabPanel>
      <LineVirtualized />
    </TabPanel>
    <TabPanel>
      <LineWindow />
    </TabPanel>
  </Tabs>
  );
}
export default App;
