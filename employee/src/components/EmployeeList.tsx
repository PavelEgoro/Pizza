import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Employee } from '../features/employee/types';
import { useNavigate } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; 
import '../styles/main.scss';

const EmployeeList: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.list);
  const filters = useSelector((state: RootState) => state.employees.filters);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'name' | 'birthday' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: 'name' | 'birthday') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const filteredEmployees = employees.filter((employee: Employee) => {
    const matchesRole = filters.role ? employee.role === filters.role : true;
    const matchesArchive = employee.isArchive === filters.isArchive;
    return matchesRole && matchesArchive;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortBy) return 0;
  
    if (sortBy === 'name') {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'birthday') {
      const [dayA, monthA, yearA] = a.birthday.split('.').map(Number);
      const [dayB, monthB, yearB] = b.birthday.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();
  
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
  
    return 0;
  });
  

  const handleEditEmployee = (id: number) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>
              Имя
              <span onClick={() => handleSort('name')}>
                {sortBy === 'name' && sortOrder === 'asc' && <FaSortUp />}
                {sortBy === 'name' && sortOrder === 'desc' && <FaSortDown />}
                {sortBy !== 'name' && <FaSort />}
              </span>
            </th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>
              Дата рождения
              <span onClick={() => handleSort('birthday')}>
                {sortBy === 'birthday' && sortOrder === 'asc' && <FaSortUp />}
                {sortBy === 'birthday' && sortOrder === 'desc' && <FaSortDown />}
                {sortBy !== 'birthday' && <FaSort />}
              </span>
            </th>
            <th>В архиве</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id} onClick={() => handleEditEmployee(employee.id)}>
              <td>{employee.name}</td>
              <td>{employee.role === 'driver' ? 'Водитель' : employee.role === 'waiter' ? 'Официант' : 'Повар'}</td>
              <td>{employee.phone}</td>
              <td>{employee.birthday}</td>
              <td>{employee.isArchive ? 'Да' : 'Нет'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
