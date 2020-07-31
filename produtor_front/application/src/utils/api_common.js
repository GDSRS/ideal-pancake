
export function apiCall(url, method, body_content, callback= () => {}) {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('userToken')
      },
      body: body_content
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      alert('Error:', error)
    })
  }