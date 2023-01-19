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