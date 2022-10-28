
let baseURL = "https://api.cijian.de";

const fetchGet = (url: string, params: any) => {
  let list = [];
  for (let key in params) {
    let str = `${key}=${params[key]}`
    list.push(str);
  }
  const data = list.join("&");
  let allUrl = `${baseURL}${url}?${data}`
  return fetch(allUrl).then((res: Response) => {
    return res.json();
  }).catch((err => {
    console.error(err)
  }))
}


const fetchPost = (url: string,params: any) => {
  let allUrl = `${baseURL}${url}`
  return fetch(allUrl,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(params)
    }).then((res: Response) => {
      return res.json();
  }).catch((err => {
    console.error(err)
  }))
}

export { fetchGet, fetchPost }
