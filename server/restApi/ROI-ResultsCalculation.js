let result = {
	totalRevenue: 0,
	totalExpense: 0,
	monthlyContributionProfit: 0,
	totalContributionProfit: 0,
	contributionMargin: 0,
	capitalROI: 0
}

exports.calculateResults = function(req) {
	let sum = req.body.total;
	// Calculations for totals
	result.totalRevenue = sum.oneTimeRevenue + (sum.monthlyRevenue * sum.monthTerm)
	result.totalExpense = sum.oneTimeExpense + (sum.monthlyExpense * sum.monthTerm)
	result.monthlyContributionProfit = sum.monthlyRevenue - sum.monthlyExpense
	result.totalContributionProfit = result.totalRevenue - result.totalExpense
	// handle case where totalRevenue is 0 (to avoid -Infinity and NaN)
	result.contributionMargin = result.totalRevenue !== 0 ? (result.totalContributionProfit / result.totalRevenue * 100).toFixed(0) : 0
	// handle case where totalExpense and totalRevenue are 0 (to avoid NaN)
	result.capitalROI = (result.totalExpense === 0 && result.totalRevenue === 0) ? 0 :
		((sum.oneTimeExpense - sum.oneTimeRevenue) / result.monthlyContributionProfit).toFixed(1)
	return result;
}