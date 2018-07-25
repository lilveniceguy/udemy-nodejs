const request = require('request')

var getGithub = (id,callback) => {
  request({
    url: 'https://api.github.com/users/'+id,
    json: true,
    headers : {
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        }
  },(error, response, body) => {
    //Formateo de objetos decente
    // return JSON.stringify(body)
    if (error) {
      callback('Imposible conectar Github Servers')
    }else{
      callback(undefined,{
        name: body.login,
        avatar: body.avatar_url,
        url: body.html_url,
        bio: body.bio
      })
    }
  })
}

// getGithub('lilveniceguy')
module.exports.getGithub = getGithub
