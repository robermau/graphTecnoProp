  export const formaterNumber = (value) => {
    if (!value) return '';
    const numeric = value.replace(/\D/g, '');
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };