package controllers

import (
	"myapp/app/config"

	"github.com/eaciit/knot/knot.v1"
)

//HomeController object structure
type HomeController struct{}

//Index Homecontroller
func (w *HomeController) Index(r *knot.WebContext) interface{} {
	r.Config.OutputType = knot.OutputTemplate
	r.Config.ViewName = "./index.html"
	confTest := config.Configs{}
	confTest.InitConfigs()

	return confTest.Value
}

//Default Homecontroller
func (w *HomeController) Login(r *knot.WebContext) interface{} {
	r.Config.OutputType = knot.OutputTemplate

	return nil
}

//Defaultdua Homecontroller
func (w *HomeController) Report(r *knot.WebContext) interface{} {
	r.Config.OutputType = knot.OutputTemplate

	d := struct {
		Test string
	}{}

	d.Test = "halo"

	return d
}

//Defaultdua Homecontroller
func (w *HomeController) Home(r *knot.WebContext) interface{} {
	r.Config.OutputType = knot.OutputTemplate
	r.Config.LayoutTemplate = "./layouts/public.html"

	d := struct {
		Test string
	}{}

	d.Test = "halo"

	return d
}
