const calcTools = {
  // Calculations for totals
  revenueCalc: function(oneTime, monthly, term) {
    return oneTime + monthly * term;
  },
  expenseCalc: function(oneTime, monthly, term) {
    return oneTime + monthly * term;
  },
  monthlyProfit: function(revenue, expense) {
    return revenue - expense;
  },
  totalProfit: function(revenue, expense) {
    return revenue - expense;
  },
  margin: function(revenue, profit) {
    if (revenue === 0) {
      return 0;
    } else {
      return ((profit / revenue) * 100).toFixed(0);
    }
  },
  ROI: function(
    expense,
    revenue,
    oneTimeExpense,
    oneTimeRevenue,
    monthlyProfit
  ) {
    if (expense === 0 && revenue === 0) {
      return 0;
    } else {
      return ((oneTimeExpense - oneTimeRevenue) / monthlyProfit).toFixed(1);
    }
  }
};

export default calcTools;
