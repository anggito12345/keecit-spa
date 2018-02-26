package main

import (
	"myapp/app/controllers"
	"os"

	"github.com/eaciit/knot/knot.v1"
)

var (
	appViewsPath = func() string {
		d, _ := os.Getwd()
		return d
	}() + "/public/web/views"
)

func main() {

	app := knot.NewApp("myapp")
	wd := func() string {
		d, _ := os.Getwd()
		return d
	}()
	app.ViewsPath = appViewsPath
	app.DefaultOutputType = knot.OutputTemplate
	app.Register(&controllers.HomeController{})
	app.Static("public", wd+"/public")
	knot.StartApp(app, "localhost:1300")
}
