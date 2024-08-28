export interface Employee {
    id: number;
    name: string;
    isArchive: boolean;
    role: 'driver' | 'waiter' | 'cook' | string;
    phone: string; 
    birthday: string;
  }
  