export const getItemState = store => store.revenueItems;


export const getRevenue = store => 
	getItemState(store) ? getItemState(store).revenue : [];

export const getRevenueById = (store, id) =>
  getItemState(store) ? { ...getItemState(store).revenue[id], id } : {};

export const getRevenueItem = store =>
	getRevenue(store).map(id => getRevenueById(store, id));

export const getRevenueList = store => {
	const revenueItems = getRevenueItem(store);
	return revenueItems;
}




