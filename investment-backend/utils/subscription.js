const calculateNextPaymentDate = (startDate, interval) => {
  const nextDate = new Date(startDate);

  switch (interval) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      break;
  }

  return nextDate;
};

module.exports = calculateNextPaymentDate;
