import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './types';
import employeesData from '../../data/employees.json';

interface EmployeeState {
  list: Employee[];
  filters: {
    role: string;
    isArchive: boolean;
  };
}

const initialState: EmployeeState = {
  list: employeesData,
  filters: {
    role: '',
    isArchive: false,
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setRoleFilter(state, action: PayloadAction<string>) {
      state.filters.role = action.payload;
    },
    toggleArchiveFilter(state) {
      state.filters.isArchive = !state.filters.isArchive;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.list.push(action.payload);
    },
    updateEmployee(state, action: PayloadAction<Employee>) {
      const index = state.list.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setRoleFilter, toggleArchiveFilter, addEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
