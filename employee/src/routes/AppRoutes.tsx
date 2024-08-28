import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import EmployeeDetailsPage from '../pages/EmployeeDetailsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employee/new" element={<EmployeeDetailsPage />} />  {/* Добавление нового сотрудника */}
        <Route path="/employee/:id" element={<EmployeeDetailsPage />} />  {/* Редактирование существующего сотрудника */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
