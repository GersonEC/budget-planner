export const getMonthlyBudget = async () => {
  try {
    const data = await fetch(`http://localhost:3000/api/monthly-budget`);
    const response = (await data.json()) as MonthlyBudget;
    return response;
  } catch (error) {
    console.log(error);
  }
};
