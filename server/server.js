const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// data initial items
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
    monthlyExpense: 60
  }
]

// routes
// get initial value
app.get('', (req, res) =>  {
  res.json(items);
});

// post add items
app.post('/add', (req, res) =>  {
  let data = req.body;
  if (data.type === 'revenue') {
    items[0].oneTimeRevenue += data.oneTime;
    items[0].monthlyRevenue += data.monthly;
  }
  if (data.type === 'expenses') {
    items[0].oneTimeExpense += data.oneTime;
    items[0].monthlyExpense += data.monthly;
  }

  // save item type for push
  let temp = data.type;

  // delete type & index (unnecessary items to push)
  delete data.type;
  delete data.index;

  // push item to array
  items[0][temp].push(data);

  res.json(items);
});

// delete item
app.delete('/delete', (req, res) =>  {
  // basic validation - req body is not empty
  if (!req.body.type || !req.body.index) {
    res.sendStatus(400)
  } else {
    let type = req.body.type;
    let index = req.body.index;
    if (type === 'revenue') {
      items[0].oneTimeRevenue -= items[0][type][index].oneTime;
      items[0].monthlyRevenue -= items[0][type][index].monthly;
    }
    if (type === 'expenses') {
      items[0].oneTimeExpense -= items[0][type][index].oneTime;
      items[0].monthlyExpense -= items[0][type][index].monthly;
    }

    // remove list item from array
    items[0][type].splice(index, 1);

    res.json(items);
  }
});

// port
app.listen(3001, function () {
    console.log('port 3001');
});
