export default class ledger {
    constructor() {
        this.entries = [
            {
                name: "test",
                oneTime: 40,
                monthly: 50
            }
        ];
        this.oneTimeTotal = 40;
        this.monthlyTotal = 50;
        // this.oneTime = 0;
        // this.monthly = 0;

        // bind class methods
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // Delete expense or revenue from list
    deleteItem(type, index) {
        console.log("Deleting item");
        // recalculate and set totals
        this.oneTimeTotal -= this.entries[index]['oneTime'];
        this.monthlyTotal -= this.entries[index]['monthly'];

        // remove list item from entries
        this.entries.splice(index, 1);
    }

    /**
     * Add new expense or revenue
     * Form values are validated in App.js, so we don't need to check here.
     */
    addItem(formName, formOneTime, formMonthly) {
        console.log("Adding item " + formName + " " + formOneTime + " " + formMonthly);
        // add new data to entries array
        this.entries.push({
            name: formName,
            oneTime: formOneTime,
            monthly: formMonthly
        });

        // update oneTime and monthly
        this.oneTimeTotal += formOneTime;
        this.monthlyTotal += formMonthly;
    }
}
