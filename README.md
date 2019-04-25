# Developer Interview Exercise
#### Zayo Labs
###

### ROI Calculator

# CONS
- Most of the calculations were handled inside the render instead of state. React is meant for handling state and is not setting dynamic data if not handled in state.
- Most of the state inside the application initially had preset numbers for the data calculations.
- EVERYTHING was in app.js. Which is never good. It should be common practice to keep the JSX in app.js level to a minimum and pass down props to your lower level components.
- no ComponentDidMount was called to initially render everything needed. Though it was in the render function, it's best to have your functions or state rendered by componentDidMount.

# PROS
- The application was straight forward and still did a lot for how minimal the project was.
- The bootstrap is a nice touch to stray away from vanilla JSX styling (heaven forbid)
- Everything worked as it should upon initial loading of the page. It's much easier to refactor working code than being thrown into a ton of errors.
- Overall: I had fun with this application! I hope your team considers me for as a team member and I can work on more fun projects! Thank you.
----------------------------
This application is a ROI Calculator built with React. A ROI (Return of Investment) calculator is an investment calculator that allows you to estimate profit and loss of investments and is particularly helpful when making financial decisions.

#### Tasks - Do as many as you'd like. Show us what you've got!
- Break App.js down into reusable components.
# as a react developer; I certainly didn't like how everything was all inside the App.js file so I broke it up into more bitesized components.
- Move calculation tool/utils to its own file.
- Create a Node/Express backend (or stack of your choice) with a rest route to handle the calculations built in the render function of App.js
# I wanted to take more time by building a full CRUD application but I only had time to build a server that grabs the data. The rest of the data manipulation is handledle through state in the frontend. you can find the server at https://github.com/brian-kracha/zayoBackend Please start the server from there view the work.
- Make the totals (revenue, expenses, contribution profit, contribution margin, etc.) reflect a 24 month term (rather than 12) or make the term dynamic, allowing the user to specify a 12, 24, 36, 48, or 60 month term.
- Any other improvements of the application.
# If i were to change anything extra visually: I might have changed the Capital ROI calculation to either red or green, depending if it was positive or negative.

**Once you have completed the exercise, submit a PR with the base fork as zayo-labs/developer-exercise master. In the body of the PR, write a PRO/CON list addressing the original state of the application. What was done well? What was done poorly?**


The app was built to mimic the functionality of the spreadsheet below.

<img src="sample_roi_spreadsheet.png" alt="ROI Spreadsheet" width="450">

All of the bold fields are calculated fields and should not be editable.  As additional revenue and expense items are added, the calculated fields should update automatically on the page.  As items are deleted, the calculated fields should also update automatically on the page.

All fields should be formatted correctly: currency format, percentage format (for the Contribution Margin), and decimal format (for the Capital ROI).

The following formulas are used in the app to calculate financials:
- One-Time Revenue = Sum of the one-time column of all revenue items
- Monthly Revenue = Sum of the monthly column of all revenue items
- One-Time Expense = Sum of the one-time column of all expense items
- Monthly Expense = Sum of the monthly column of all expense items
- Total Revenue = One-Time Revenue + Monthly Revenue * 12
- Total Expenses = One-Time Expense + Monthly Expenses * 12
- Monthly Contribution Profit = Monthly Revenue – Monthly Expenses
- Total Contribution Profit = Total Revenue – Total Expenses
- Contribution Margin = Total Contribution Profit / Total Revenue
- Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit

To get started:
```
// Fork and clone the repo

$ cd developer-exercise/
$ yarn                       // to install dependencies
$ yarn start                 // to start the server
```


Feel free to reach out with any questions.
