var auth = {
  loginDo : function() {
    return $.ajax({
      url: "http://localhost:9400/login/do",
      method: "post",
      data: JSON.stringify({
        "username" : "eaciit",
        "password" : "Password.1"
      })
    })
  }
}