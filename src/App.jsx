import React from "react";
import './main.global.css';
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import HomePage from "./components/HomePage/HomePage";
import StatisticPage from "./components/StatisticPage/StatisticPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Layout>
      <Header />
      <Content>
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/timer" element={<HomePage />} />
          <Route path="/statistic" element={<StatisticPage />} />
        </Routes>
      </Content>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
