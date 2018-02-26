package helpers

import (
	"io/ioutil"
)

//Fileutils define object
//@fields
//Filepath define file path to process
//Rawfile store raw file based on path
//basepath store basepath
type Fileutils struct {
	Filepath string
	Rawfile  []byte
	Basepath string
}

//Readfile from path
func (fu *Fileutils) Readfile() error {
	raw, err := ioutil.ReadFile(fu.Basepath + fu.Filepath)

	if err != nil {
		return err
	}

	fu.Rawfile = raw

	return nil
}
