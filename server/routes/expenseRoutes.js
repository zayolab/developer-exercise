const express = require("express")
const {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
} = require("../controllers/expenses")

const router = express.Router()

/*
 * Route:           /api/expenses
 * Method:          GET
 * Access:          Public
 * Description:     Fetch list of expenses
 */
router.get("/", getExpenses)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Create new expense entry
 */
router.post("/", addExpense)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Update expense entry
 */

router.put("/:id", updateExpense)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Delete expense entry
 */

router.delete("/:id", deleteExpense)

module.exports = router
