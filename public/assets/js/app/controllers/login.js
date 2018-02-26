var ViewModel = {
  "username" : ko.observable("Super").extend({
    required : "Please bla bla"
  }),
  "password" : ko.observable("")
}


function login(app){
  var def = $.Deferred()
  var prom = def.promise()
  app.loadScript("/public/assets/js/app/services/auth.js").then(function(res){
    
    def.resolve()
  },function(){
    def.reject()
  })

  
  prom.then(function(){
    
    
    this.df = ViewModel
    this.df.username = ko.observable("Anggito")
  
    
    $('#kendoform').submit(function(e){
      e.preventDefault()
      var valid = $('#kendoform').kendoValidator().data('kendoValidator')
      console.log('hoi')  
      
      if(valid.validate()){
        auth.loginDo().then(function(){
          app.changeRoute("home")
        })
      }else{
        console.log('not so good')
      }
    })

    app.go(this.df,"modeldef")
  })

  

}
