import React, { useState } from 'react';
import { Employee } from '../features/employee/types';
import { useDispatch } from 'react-redux';
import { updateEmployee, addEmployee } from '../features/employee/employeeSlice';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../styles/main.scss';

interface EmployeeFormProps {
  employee?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employee>({
    id: employee?.id || Date.now(),
    name: employee?.name || '',
    isArchive: employee?.isArchive || false,
    role: (employee?.role as 'driver' | 'waiter' | 'cook') || 'driver',
    phone: employee?.phone || '',
    birthday: employee?.birthday || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = () => {
    if (employee) {
      dispatch(updateEmployee(formData));
    } else {
      dispatch(addEmployee(formData));
    }
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <form className="employee-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="form-group">
        <label htmlFor="name">Имя:</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Телефон:</label>
        <InputMask
          id="phone"
          name="phone"
          mask="+7(999) 999-9999"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Дата рождения:</label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Должность:</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="driver">Водитель</option>
          <option value="waiter">Официант</option>
          <option value="cook">Повар</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="isArchive">
          <input
            id="isArchive"
            name="isArchive"
            type="checkbox"
            checked={formData.isArchive}
            onChange={handleChange}
          />
          В архиве
        </label>
      </div>
      <div className="form-buttons">
        <button className="submit-button" type="submit">Сохранить</button>
        <button className="cancel-button" type="button" onClick={handleCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
