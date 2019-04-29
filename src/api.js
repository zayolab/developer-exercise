// API functions

// GET all expenses/revenues, and roi calculations
export function fetchData() {
  return fetch('http://localhost:8080/api/roicalculator')
    .then(res => res.json())
    .catch(error => console.log(error));
}

// POST new expense/revenue
export function postData(data) {
  return fetch('http://localhost:8080/api/roicalculator', {
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

// Delete expense or revenue
export function deleteData(type, id) {
  return fetch(`http://localhost:8080/api/roicalculator/${type}/${id}`, {
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