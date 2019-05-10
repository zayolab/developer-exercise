let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

// data items
let items = [
  {revenue: [
    {
      name: 'Item 1',
      oneTime: 100,
      monthly: 50
    },
    {
      name: 'Item 2',
      oneTime: 50,
      monthly: 25
    },
    {
      name: 'Item 3',
      oneTime: 25,
      monthly: 85
    }],
    expenses:[{
      name: 'Expense 1',
      oneTime: 500,
      monthly: 20.00
    },
    {
      name: 'Expense 2',
      oneTime: 200,
      monthly: 40
    }],
    oneTimeRevenue: 175,
    oneTimeExpense: 700,
    monthlyRevenue: 160,
    monthlyExpense: 60,
    newType: '',
    newName: '',
    newOneTime: '',
    newMonthly: '',
    error: false
  }
]

// routes
// initial value
app.get('', (req, res) =>  {
  res.json(items);
});

// add items
app.post('/add', (req, res) =>  {
  console.log(req.body);
  res.sendStatus(200);
});

// port
app.listen(3001, function () {
    console.log('port 3001');
});
