export async function profileUser() {
  let response;
  try { response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + JSON.parse(localStorage.getItem('token')).token
    }
  })
    .then(data => data.json())
  } catch(err){
    window.location.href="http://localhost:3000/error500"
    console.log(err)
  }

return response;
}

export async function updateUser(infos) {
  let response;
  try { response = await fetch('http://localhost:3001/api/v1/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + JSON.parse(localStorage.getItem('token')).token
    },
    body: JSON.stringify(infos)
  })
    .then(data => data.json())
 } catch(err){
  console.log(err)
 }
 return response;
}

export async function loginUser(infos) {
  let response;
  try { response = await fetch('http://localhost:3001/api/v1/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(infos)
  })
    .then(data => data.json())
 }catch(err){
  console.log(err)
  }
  return response
}


export async function emptyStorage() {
  localStorage.clear();
 }