# ROI Calculator

## About the app

This app allows one to enter revenues and expenses and see an immediate calculation of a variety of ROI formulas.


## Home

The home page on app load shows several revenue and expense entries. These entries are here for demonstration purposes and to help one play around with the app easier. The top of the screen has a form which allows a user to enter a new revenue or expense item.

To clear the existing data, a user can click “Clear Data” in the header.

![Example](screenshots/1.png)


## Form Validation

When submitting a form, the app checks to make sure there is an appropriate entry type, name, on-time amount, and monthly-amount. Failing to enter the correct information props an error dialogue box that provides the user with information on what they need to fix

![Example](screenshots/2 error.png)


## Clear Data

If a user wants to start with a blank slate, he/she can simply click “Clear Data” which will remove all entries from the Revenue and Expense table.

![Example](screenshots/3 clear data.png)


## Clear Revenue or Expense Table

If a user wants to clear either the Revenue or the Expense table, they simply click “Clear All Revenues” or “Clear All Expenses” to delete the appropriate entries. Once cleared, the button to clear the data disappears until new data has been entered

![Example](screenshots/4 clear revenues.png)


## Edit Entries

A user can edit an entry by clicking “Edit” in the table. This renders a form at the top with pre-filled information for that entry. A user can change any of that infor and then click “Update Revenue” or “Update Expense” to update the entry. The user also has the option to delete the entry or to cancel editing.

Failing to provide the appropriate information props an error dialogue box info on what to change.

![Example](screenshots/5 edit revenue.png)

![Example](screenshots/6 edit error val.png)


## Results

The bottom table in the app displays the ROI results. This information is updated automatically whenever expenses or revenues change. The entries for the ROI values change to red if the calculation results in a negative number.

The default term length for the ROI calculations is 12 months, but the user can select up to 60 months by choosing the value from the dropdown. This change also causes an automatic update to the ROI calculations.

![Example](screenshots/7 results .png)

![Example](screenshots/8 results term.png)

![Example](screenshots/9 results red.png)
