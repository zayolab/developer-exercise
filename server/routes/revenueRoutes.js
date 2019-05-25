const express = require("express")
const {
  getRevenues,
  addRevenue,
  deleteRevenue,
  updateRevenue
} = require("../controllers/revenue")

const router = express.Router()

/*
 * Route:           /api/expenses
 * Method:          GET
 * Access:          Public
 * Description:     Fetch list of revenues
 */
router.get("/", getRevenues)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Create new revenue entry
 */
router.post("/", addRevenue)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Update revenue entry
 */

router.put("/:id", updateRevenue)

/*
 * Route:           /api/expenses
 * Method:          POST
 * Access:          Public
 * Description:     Delete revenue entry
 */

router.delete("/:id", deleteRevenue)

module.exports = router
