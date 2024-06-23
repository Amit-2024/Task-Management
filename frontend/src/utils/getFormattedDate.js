const getFormattedDate = (input) => {
    const date = new Date(input);
    // Format the date as ISO (yyyy-MM-dd)
    const isoDate = date.toISOString().split('T')[0];
    return isoDate;
  };
  
  export default getFormattedDate;
  