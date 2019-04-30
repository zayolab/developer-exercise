// API functions
import { API_BASE_URL } from './config';
// GET all expenses/revenues, and roi calculations
export function fetchData() {
  return fetch(`${API_BASE_URL}/api/roicalculator`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

// POST new expense/revenue
export function postData(data) {
  return fetch(`${API_BASE_URL}/api/roicalculator`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }
    return res.json();
  })
  .catch(err => {
    console.log(err);
  });
}

// POST Time Frame and get back new totals, contribution profit and margin
export function postTimeFrame(timeFrame) {
  return fetch(`${API_BASE_URL}/api/roicalculator/timeframe`, {
    method: 'POST',
    body: JSON.stringify(timeFrame),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }
    return res.json();
  })
  .catch(err => {
    console.log(err);
  });
}

// Delete expense or revenue
export function deleteData(type, id) {
  console.log(typeof id);
  return fetch(`${API_BASE_URL}/api/roicalculator/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (!res.ok) {
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
}