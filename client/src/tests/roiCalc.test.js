import { mockRevenue, mockExpenses } from "../mocks"
import {
  getOneTime,
  getMonthly,
  getTotal,
  getContributionProfit,
  getContributionMargin,
  getCapitalROI
} from "../utils/roiCalc"

describe("roiCalc functions", () => {
  let timePeriod = 2
  let oneTimeRevenue = getOneTime(mockRevenue)
  let oneTimeExpense = getOneTime(mockExpenses)
  let monthlyRevenue = getMonthly(mockRevenue)
  let monthlyExpense = getMonthly(mockExpenses)

  let totalRevenue = getTotal(oneTimeRevenue, monthlyRevenue, timePeriod)
  let totalExpense = getTotal(oneTimeExpense, monthlyExpense, timePeriod)

  let monthlyContributionProfit = getContributionProfit(
    monthlyRevenue,
    monthlyExpense
  )

  let totalContributionProfit = getContributionProfit(
    totalRevenue,
    totalExpense
  )

  let contributionMargin = getContributionMargin(
    totalContributionProfit,
    totalRevenue
  )

  let capitalROI = getCapitalROI(
    totalRevenue,
    totalExpense,
    oneTimeRevenue,
    oneTimeExpense,
    monthlyContributionProfit
  )

  it("should calculate total one-time transactions correctly", () => {
    expect(oneTimeRevenue).toEqual(600)
    expect(oneTimeExpense).toEqual(500)
  })

  it("should calculate total monthly transactions correctly", () => {
    expect(monthlyRevenue).toEqual(135)
    expect(monthlyExpense).toEqual(90)
  })

  it("should calculate total transactions correctly", () => {
    expect(totalRevenue).toEqual(870)
    expect(totalExpense).toEqual(680)
  })

  it("should calculate contribution profit correctly", () => {
    expect(monthlyContributionProfit).toEqual(45)
    expect(totalContributionProfit).toEqual(190)
  })

  it("should calculate contribution margin correctly", () => {
    expect(contributionMargin).toEqual("22")
  })

  it("should calculate monthly capital ROI correctly", () => {
    expect(capitalROI).toEqual("-2.2")
  })
})
