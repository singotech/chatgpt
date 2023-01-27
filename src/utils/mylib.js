var CryptoJS = require('crypto-js')

var utilFunc = {
  foo () { console.log('-----') },

  googleAnswerAdapter(method, aID, prev) {
    var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var ts = Math.floor(Date.now() / 1000)
    var raw = {
      "op": method,
      "ts": ts
    };

    if (method != "getAnswerID") {
      raw.aid = aID
      raw.prev = prev
    }

    var payload = JSON.stringify(raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: payload,
      redirect: 'follow'
    };

    var k = CryptoJS.MD5(process.env.API_KEY + payload).toString();
    return fetch(process.env.API_BASE_URL + '?k=' + k, requestOptions)
      .then(response => response.json())
      .catch(error => {
        console.log(error)
      })
  }

}

export default utilFunc