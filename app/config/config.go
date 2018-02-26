package config

import (
	"encoding/json"
	"helpers"
	"os"

	"github.com/eaciit/toolkit"
)

//Configs object structure
//value store config value
//err store error value
type Configs struct {
	Value interface{}
	Err   error
}

/*InitConfigs load all Configs

 */
func (confobj *Configs) InitConfigs() interface{} {

	confJSON := toolkit.M{}

	fileutil := helpers.Fileutils{}
	fileutil.Basepath, confobj.Err = os.Getwd()
	fileutil.Filepath = "./app/config/config.json"

	if confobj.Err != nil {
		panic(confobj.Err.Error())
		os.Exit(1)
	}

	confobj.Err = fileutil.Readfile()

	if confobj.Err != nil {
		panic(confobj.Err.Error())
		os.Exit(1)
	}

	json.Unmarshal(fileutil.Rawfile, &confobj.Value)

	return confJSON
}
