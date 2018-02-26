function home(app){
  var ViewModel = {
    refclick : function (rt){
      app.changeRoute(rt)
    }
  }


  console.log(app)
  app.go(ViewModel,"homectrl")
}

