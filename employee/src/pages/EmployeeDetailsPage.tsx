import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../features/employee/types';
import '../styles/main.scss';  

const EmployeeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = useSelector((state: RootState) =>
    state.employees.list.find((emp: Employee) => emp.id === Number(id))
  );

  return (
    <div  className="employee-form employee-details-page">
      <h2>{employee ? 'Редактировать сотрудника' : 'Добавить нового сотрудника'}</h2>
      <EmployeeForm employee={employee} />
    </div>
  );
};

export default EmployeeDetailsPage;
