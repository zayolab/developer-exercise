# Developer Interview Exercise
#### Zayo Labs
###

Thank you for giving me the opportunity to learn how to build an ROI calculator in React! I’m always looking for ways to make the websites I create more interesting and useful. Having an ROI (or other type of) calculator on a website is a very savvy marketing tool. Not only does it add an immediate value, it also creates an opportunity for the user to interact dynamically with the site. It can contribute to lead generation if the user volunteers their information, which leads to an opportunity to collect data. It can also increase brand awareness, sometimes exponentially, through social media shares. Very fun to work through!

While reviewing the existing code, I made some observations about works and what could be improved. Here’s my take on the pros and cons of this app:

PROS
The app in its initial state is . . .
-Simple and straightforward
-The user could quickly add and delete a revenue or expense item
-The user would be warned if incorrect data was entered or missing
-The calculations worked
-The code base was well-written
-Good commenting within the code

CONS
User Interface:
-The user interface for the calculator could be improved by incorporating:
-Comma separated formatting for integers
-More accurate placeholder and form field labeling
-Highlighting or focus on key fields such as totals, particularly the total ROI
-The ability to clear all the data fields
-The ability to edit an entry
-More specific error alerts
-Improved form styling for visual interest and proper alignment
-A way to import/export data

Codebase:
The app is written within one file. Reasons this isn’t a great solution:
-Difficult to separate concerns
-Hard to find and make changes
-Hard to reuse code
-Duplication of code
Use of Bind:
	I didn’t change this as I felt it was important to respect the “tone” of the original code, however I would likely change this if I were creating my own application. I don’t think the implicitness of bind is necessary and would have rewritten using ES6+ fat arrow functions.

Things I’ve implemented:
-Restructured the app by creating components for specific features
-Created a reusable data table component for revenue and expense tables
-Started to improve the styling


Improvements I’d make moving forward:
-Add functionality and calculations to make it an Internal Rate of Return
Calculator, which allows a user to look at the bottom line of an investment by calculating an annualized rate of return and net present value to support both irregular length periods and exact date data entry for the cash flows.
-Add the function to upload CSV files or download results
-Put the calculator in a modal or toast to allow the user to access information on a webpage and pop open the calculator when needed
-Add the ability to download the calculator and persist the user’s data in a database

### ROI Calculator

This application is a ROI Calculator built with React. A ROI (Return of Investment) calculator is an investment calculator that allows you to estimate profit and loss of investments and is particularly helpful when making financial decisions.

#### Tasks - Do as many as you'd like. Show us what you've got!
- Break App.js down into reusable components.
- Move calculation tool/utils to its own file.
- Create a Node/Express backend (or stack of your choice) with a rest route to handle the calculations built in the render function of App.js
- Make the totals (revenue, expenses, contribution profit, contribution margin, etc.) reflect a 24 month term (rather than 12) or make the term dynamic, allowing the user to specify a 12, 24, 36, 48, or 60 month term.
- Any other improvements of the application.

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
