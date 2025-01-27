export const patchMonthlyBudget = async (id: string, dataToUpdate: object) => {
  try {
    const data = await fetch(`http://localhost:3000/api/monthly-budget/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToUpdate),
    });
    const response = await data.json();
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
