import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const toast = ({ title, description }) => {
    setToast({ title, description });

    // Automatically clear toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return {
    toast,
    toastData: toast,
  };
};
