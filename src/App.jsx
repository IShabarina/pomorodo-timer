import React, { useTransition } from "react";
import './main.global.css';
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import StatisticPage from "./components/StatisticPage/StatisticPage";
import Content from "./components/Content/Content";

import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    // <BrowserRouter>
    <Layout>
      <Header />
      <Content>
        <Routes >
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<Navigate to="/timer" />} /> */}
          <Route path="/timer" element={<HomePage />} />
          <Route path="/statistic" element={<StatisticPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Content>
    </Layout>
    // </BrowserRouter>
  );
}

export default App;
