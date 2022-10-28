import { fetchGet, fetchPost } from './util/http'

console.log('background script loaded')

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  console.log(request)
  // 发布
  if (request.todo === 'publish') {
    let data = request.data;
    console.log(data)
    fetchPost('/bully_screen/post',data).then (response => {
      console.log(response)
      sendResponse(response)
    })
  } else {
    sendResponse('我是后台：' + JSON.stringify(request))
  }
})
