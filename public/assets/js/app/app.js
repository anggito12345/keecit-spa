

keciit.newKeciit().then(function(app){
  //app has binded with knock

  ViewModel = {
    "welcome" : ko.observable("hai"),
    // "helo" : function() {
    //   app.changeRoute("login")
    // }
  }
  
  app.base = "/public/assets/js/app/"
  app.controllerPath = "controllers/"
  app.partialPath = "partials/"
  app.routePath = {
    "login" : {
      "name" : "login",
      "path" : "login/:par1/:par2",
      "logic": function(par1,par2){
        //coolllll
        this.login["js"] = par1
        this.login["view"] = par2
      }            
    },
    "home" : {      
      "js" : "home",      
    },
    "dynamic" : {
      "js" : "report",           
      "path" : "home/report",       
      "routeId" : "route2",
      "parent" : "home"
    },
  }

  


  app.go(ViewModel,"model1")
})


