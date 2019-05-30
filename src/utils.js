// Calculations for totals
let totalRevenue = this.state.oneTimeRevenue + (this.state.monthlyRevenue * 12)

let totalExpense = this.state.oneTimeExpense + (this.state.monthlyExpense * 12)

let monthlyContributionProfit = this.state.monthlyRevenue - this.state.monthlyExpense

let totalContributionProfit = totalRevenue - totalExpense

// handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
let contributionMargin = totalRevenue !== 0 ? (totalContributionProfit / totalRevenue * 100).toFixed(0) : 0

// handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
let capitalROI = (totalExpense === 0 && totalRevenue === 0) ? 0 : ((this.state.oneTimeExpense - this.state.oneTimeRevenue) / monthlyContributionProfit).toFixed(1)
