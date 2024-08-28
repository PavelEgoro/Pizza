import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import EmployeeList from '../components/EmployeeList';
import { setRoleFilter, toggleArchiveFilter } from '../features/employee/employeeSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/main.scss';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector((state: RootState) => state.employees.filters);

  const handleAddEmployee = () => {
    navigate('/employee/new'); 
  };

  return (
    <div className="homepage-container">
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="role-filter">Должность:</label>
        <select id="role-filter" value={filters.role} onChange={(e) => dispatch(setRoleFilter(e.target.value))}>
          <option value="">Все должности</option>
          <option value="driver">Водитель</option>
          <option value="waiter">Официант</option>
          <option value="cook">Повар</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="archive-filter">
          <input
            id="archive-filter"
            type="checkbox"
            checked={filters.isArchive}
            onChange={() => dispatch(toggleArchiveFilter())}
          />
          В архиве
        </label>
      </div>
    </div>
    <EmployeeList />
    <button className="add-button" onClick={handleAddEmployee}>Добавить нового сотрудника</button>
  </div>
  
  );
};

export default HomePage;
