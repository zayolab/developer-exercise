'use strict';

const express = require('express');
const Models = require('../models');

const router = express.Router();

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

// GET all revenues and expenses, and ROI calculations
router.get('/', (req, res, next) => {
  let revenues;
  let expenses;

  Models.Revenue.findAll()
    .then(results => {
      revenues = JSON.stringify(results);
      revenues = JSON.parse(revenues);
      return Models.Expense.findAll();
    })
    .then(results => {
      expenses = JSON.stringify(results);
      expenses = JSON.parse(expenses);
    })
    .then(() => {
      // ROI calculations
      const oneTimeRevenue = calculateOneTime(revenues);
      const oneTimeExpense = calculateOneTime(expenses);
      const monthlyRevenue = calculateMonthly(revenues);
      const monthlyExpense = calculateMonthly(expenses);
      const totalRevenue = calculateTotal(oneTimeRevenue, monthlyRevenue);
      const totalExpense = calculateTotal(oneTimeExpense, monthlyExpense);
      const monthlyContributionProfit = calculateContributionProfit(monthlyRevenue, monthlyExpense);
      const totalContributionProfit = calculateContributionProfit(totalRevenue, totalExpense);
      const contributionMargin = calculateContributionMargin(totalRevenue, totalContributionProfit);
      const capitalROI = calculateCapitalROI(totalExpense, totalRevenue, oneTimeExpense, oneTimeRevenue, monthlyContributionProfit);

      // Send data obj with revenues, expenses, and ROI calculations
      const data = {
        revenues,
        expenses,
        oneTimeRevenue,
        oneTimeExpense,
        monthlyRevenue,
        monthlyExpense,
        totalRevenue,
        totalExpense,
        monthlyContributionProfit,
        totalContributionProfit,
        contributionMargin,
        capitalROI
      };
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST new expense or revenue
router.post('/', (req, res, next) => {
  const {type, name, oneTime, monthly} = req.body;

  // Validate request body
  if (!name || typeof name !== String) {
    const err = new Error('There is an ussue with `name` in request body');
    err.status = 400;
    return next(err);
  }

  if (!oneTime && oneTime !== 0 || typeof oneTime !== Number) {
    const err = new Error('There is an ussue with `oneTime` in request body');
    err.status = 400;
    return next(err);
  }

  if (!monthly && monthly !== 0 || typeof monthly !== Number) {
    const err = new Error('There is an ussue with `monthly` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = {name, oneTime, monthly};

  // Check for expense or revenue, create new record
  if (type === 'expense') {
    Models.Expense.create(newItem)
      .then(result => {
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => {
        next(err);
      });
  } else {
    Models.Revenue.create(newItem)
      .then(result => {
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => {
        next(err);
      });
  }
});

module.exports = router;