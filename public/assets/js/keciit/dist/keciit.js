/*
  Author : Anggito
  Supported : Knockout JS, Kendo UI, Golang
*/

var keciit = {

  bundledPath: "",
  dependencies : {
    "knockout" : {
      base : "/public/assets/js/",
      js : "knockout.js"
    },    
    "kendoui" : {
      base : "/public/assets/js/keciit/plugins/kendoui/",
      js : "js/kendo.all.min.js"
    },
    "es6" : {
      base : "/public/assets/js/keciit/plugins/es6/",
      js : "ES6.js"
    },
    
  },

  

  init : function() {
    self.init.test = ko.observable("halo")
    
  },

  

  newKeciit: function(conf) {
    var def = $.Deferred()
    var prom = def.promise()
    var self = this
    var flag = 1;
    var isDone = function() {
      if(flag > Object.keys(self.dependencies).length - 1){

        class initObj {
          constructor(){
            this.route = ko.observable(window.location.href.split('#')[1])
            this.loadTime = 0
            this.args = {}
          }

          loadScript(url,callbackScs,callbackErr){
            var self = this
            var test = self.getJsClassName(url)
            $('#'+test.split('.')[0]).remove()
            var result = $.Deferred(),
            script = document.createElement("script");
            script.async = "async";
            script.type = "text/javascript";
            script.id = self.getJsClassName(url).split('.')[0]; 
            script.src = url + "?v=1";
            script.onload = script.onreadystatechange = function (_, isAbort) {
                
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                  if (isAbort)
                      result.reject();
                  else
                      result.resolve();
              }
            };
            script.onerror = function () { result.reject(); };
            $("head")[0].appendChild(script);
            return result.promise();
          }
          

          $parent(){
            return this
          }

          getJsClassName(str) {
            var chkArr = str.split("/")
            if(chkArr.length > 0){
              return chkArr[chkArr.length - 1]
            }else{
              return str
            }
          }


          useTemplate(tag, data) {
            var template = tag.html()
            var def = $.Deferred()
            var prom = def.promise()
            var i = 0,
                len = data.length,
                html = '';
            // Replace the {{XXX}} with the corresponding property
            function replaceWithData(data_bit) {
                var html_snippet = "", prop, regex;
                // {([^}]\s*hai\s*)}}
                for (prop in data_bit) {
                    
                    regex = new RegExp('\!([^}]\\s*data:\\s*'+prop+'\\s*)}!');
                    
                    if(typeof data_bit[prop] === 'function'){
                      if(typeof data_bit[prop]() !== "undefined")                    
                        html_snippet = (html_snippet || template).replace(regex, data_bit[prop]());
                    }                      
                    else
                      html_snippet = (html_snippet || template).replace(regex, data_bit[prop]);
                }
                return html_snippet;
            }
            // Go through each element in the array and add the properties to the template
            
            for (i = 0; i <= len; i++) {
                
                html += replaceWithData(data[i]);
                
                console.log(i, len)

                if(i >= len)
                {
                  
                  $(tag).html(html)
                  def.resolve()
                }

            }
      
            // Give back the HTML to be added to the DOM
            return prom;
        }

        gerRoute(path){
          var def = $.Deferred()
          var prom = def.promise()
          var self = this
          var keysPath = Object.keys(this.routePath)
          var loop = 0
          var len = keysPath.length
          var done = 0
          

          var creatingReg = function(rtPath) {
            var defc = $.Deferred()
            var promc = defc.promise()
            if(typeof rtPath == typeof undefined)
              return ""
            var arrP = rtPath.split("/")
            var reg  = "(";
            for(var n=0;n<=arrP.length - 1; n++){
              //make regex
              if(n != 0 )
                reg+="+\/+"

              if( arrP[n].indexOf(":") < 0 ) {
                reg += ""+arrP[n]+""
              }else{
                reg += ":+[^\\/\\s]"                
                self.args[String(arrP[n]).substring(1,arrP[n].length)] = path.split("/")[n]
              }

              if(n >= arrP.length-1){
                reg += ")"
                defc.resolve(reg)
              }
            }
            
            return promc
          }
          
          
          
          
          $.each(keysPath,function(i,k){
            var test = self.routePath[k].path
            creatingReg(test).then(function(nreg){
              var reg = new RegExp(nreg)
              if(String(path).match(reg)){
                   def.resolve(k)
              }
            })
            
          })

          return prom
        }

        changeRoute(newRoute){
          var self = this
          var routeId = "route"
          var path = newRoute
          var def = $.Deferred()
          var prom = def.promise()
          
          if(typeof this.routePath != typeof undefined){
            if(typeof self.routePath[newRoute] != typeof undefined){
              
              if(typeof self.routePath[newRoute]['routeId'] != typeof undefined){
                routeId = self.routePath[newRoute]['routeId']
              } 

              if(typeof self.routePath[newRoute]['path'] != typeof undefined){
                path = self.routePath[newRoute]['path']
              }
              
              if(typeof self.routePath[newRoute]['logic'] != typeof undefined){
                self.routePath[newRoute]['logic']()
              }

              if(typeof self.routePath[newRoute]['js'] != typeof undefined){

                self.loadScript(self.base + self.controllerPath + self.routePath[newRoute]['js'] + ".js").then(function(res){                                                                                          
                  window.history.pushState("", "", '#'+newRoute);      
                          
                  $('#' + routeId).load(self.base + self.partialPath + self.routePath[newRoute]['view'] + ".html" ,function(xhr){
                    if(typeof self.routePath[newRoute]['callback'] != typeof undefined){
                      self[self.getJsClassName(newRoute)] = self.routePath[newRoute]['callback'](self)
                    }else{
                      self[self.getJsClassName(newRoute)] = new window[self.getJsClassName(newRoute)](self)
                    }

                    def.resolve(xhr)
                  },function(){
                    // console.log('asdas')
                    def.reject()
                  })   
                },function(err){
                  // console.log(err)
                })
              }
            }
          }
            
            return prom
            
          }

          firstTimeLoad(routeName){
            var self = this            
            var def = $.Deferred()
            var prom = def.promise()
            self.gerRoute(routeName).then(function(ret){
              routeName = ret
              
              if(typeof self.routePath[routeName].parent != typeof undefined){
                self.changeRoute(self.routePath[routeName].parent).then(function(htm){                    
                  self.firstTimeLoad(self.routePath[routeName].parent)
                })
                
              }else{                
                self.changeRoute(routeName).then(function(htm){
                  def.resolve(htm)
                })              
              } 
            })            
            return prom           
          }

     
          go(mdl,bindId){
            var self = this
            var loadKnock = function(bindID){
              if(bindID != null){
                //binding keecit param              
                ko.applyBindings(mdl,document.getElementById(bindID))
                console.log(self.loadTime, " load time")
              }else{
                ko.applyBindings(mdl)
              }

              self.loadTime++
            }

            var datas = []    
            datas.push(mdl)

            if(self.loadTime == 0){
              //read routepath
              self.firstTimeLoad(this.route(),datas).then(function(htm){
                
                self.useTemplate($('#'+bindId),datas).then(function(){
                  loadKnock(bindId)
                })
                
              })
              
            }else{

              self.useTemplate($('#'+bindId),datas).then(function(){
                
                loadKnock(bindId)
              })
              
            }

            
          }
        }

        var initKoobj = new initObj()
        if(typeof initKoobj.route() != typeof undefined){      
          // console.log(initKoobj.route())
        }

        // initKoobj.route.subscribe(function(newRoute){   
        //   initKoobj.changeRoute(newRoute)
        // })
       
        def.resolve(initKoobj)
        
      }
      return false;
    }
    
    $.each(this.dependencies,function(i){
      $.getScript(self.dependencies[i].base + self.dependencies[i].js).then(function(){
        isDone()
        flag++;
      })
    })
    

    return prom;
  },


}



