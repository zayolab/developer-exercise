import App from './App'

class Delete {

    delete(type, index) {

        // listType will be 'expenses' or 'revenue' depending on item to delete
        let listType = App.state[type]
        // recalculate and set totals in state
        if (type === 'expenses') {
            App.setState({
                oneTimeExpense: this.state.oneTimeExpense - this.state.expenses[index]['oneTime'],
                monthlyExpense: App.state.monthlyExpense - App.state.expenses[index]['monthly'],
            })
        } else {
        // for revenue
            App.setState({
                oneTimeRevenue: App.state.oneTimeRevenue - App.state.revenue[index]['oneTime'],
                monthlyRevenue: App.state.monthlyRevenue - App.state.revenue[index]['monthly'],
            })
        }
        // remove list item from state array
        App.setState({
        [listType]: listType.splice(index, 1),
        });
        }
}

export default Delete;