export const getOneTime = list => {
  return list.reduce((acc, item) => acc + Number(item.one_time), 0)
}

export const getMonthly = list => {
  return list.reduce((acc, item) => acc + Number(item.monthly), 0)
}

export const getTotal = (oneTime, monthly, timePeriod) => {
  return oneTime + monthly * timePeriod
}

export const getContributionProfit = (revenue, expense) => {
  return revenue - expense
}

export const getContributionMargin = (
  totalContributionProfit,
  totalRevenue
) => {
  return totalRevenue !== 0
    ? ((totalContributionProfit / totalRevenue) * 100).toFixed(0)
    : "0"
}

export const getCapitalROI = (
  totalRevenue,
  totalExpense,
  oneTimeRevenue,
  oneTimeExpense,
  monthlyContributionProfit
) => {
  return totalExpense === 0 && totalRevenue === 0
    ? "0"
    : ((oneTimeExpense - oneTimeRevenue) / monthlyContributionProfit).toFixed(1)
}
