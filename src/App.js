import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';
import Home from './pages/Home';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import 'antd/dist/reset.css';

const { Header, Content, Footer } = Layout;

// const items = [
//   { label: 'Home', key: '1' },
//   { label: 'Jobs', key: '2' },
// ];

const App = () => {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2" icon={<PlusCircleOutlined />}><Link to="/add-job">Add Job</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Knovator Technologies ©2025</Footer>
      </Layout>
    </Router>
  );
};

export default App;

