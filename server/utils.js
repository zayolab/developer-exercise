'use strict';

// ROI calculations
function calculateOneTime(data) {
  let oneTime = 0;
  data.forEach(item => {
    oneTime += item.oneTime;
  });
  return oneTime; 
}

function calculateMonthly(data) {
  let monthly = 0;
  data.forEach(item => {
    monthly += item.monthly;
  });
  return monthly;
}

function calculateTotal(oneTime, monthly) {
  let total = oneTime + (monthly * 12);
  return total;
}

function calculateContributionProfit(revenue, expense) {
  let contributionProfit = revenue - expense;
  return contributionProfit;
}

function calculateContributionMargin(revenue, profit) {
  // handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
  let contributionMargin = revenue !== 0 ? (profit / revenue * 100).toFixed(0) : 0;
  return contributionMargin;
}

function calculateCapitalROI(totalExpense, totalRevenue, oneTimeExpense, oneTimeRevenue, monthlyContributionProfit) {
  // handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
  let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((oneTimeExpense - oneTimeRevenue) / monthlyContributionProfit).toFixed(1);
  return capitalROI;
}

module.exports = {
  calculateOneTime,
  calculateMonthly,
  calculateTotal,
  calculateContributionProfit,
  calculateContributionMargin,
  calculateCapitalROI
};