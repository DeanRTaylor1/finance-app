
var year = new Date().getFullYear();
var month = new Date().getMonth();


const getWeeklySavings = (monthlySalary: number, monthlyOutgoings: number) => {
  const freeCash = monthlySalary - monthlyOutgoings;
  const days = daysInMonth(year, month)

  return Math.floor((freeCash / days) * 7)


}

function daysInMonth(month: number, year: number) { // Use 1 for January, 2 for February, etc.
  return new Date(year, month, 0).getDate();
}

const getDailySpend = (totalOutgoings: number) => {

  const days = daysInMonth(year, month)

  return Math.floor(totalOutgoings / days);
}

export { getWeeklySavings, getDailySpend }
