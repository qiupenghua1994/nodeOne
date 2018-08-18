var express = require('express');
var router = express.Router();
var exec = require('child_process');
var os = require('os');

//更新重启node
router.post('/restartNode', function (req,res) {
    var ret = {
        message:'manage restart node'
    };
    res.json(ret);

    if(os.type().indexOf('indows')){
        exec.exec('restart.bat',function (err,stdout,stderr) {
            if (err) {
                return;
            }
        });
    }else{
        exec.exec('./restart.bat',function (err,stdout,stderr) {
            if (err) {
                return;
            }
        });
    }
});
//更新重启node
router.post('/restartVue', function (req,res) {
    var ret = {
        message:'manage restart vue'
    };
    res.json(ret);

    if(os.type().indexOf('indows')){
        exec.exec('restart-vue.bat',function (err,stdout,stderr) {
            if (err) {
                return;
            }
        });
    }else{
        exec.exec('./restart-vue.bat',function (err,stdout,stderr) {
            if (err) {
                return;
            }
        });
    }
});
module.exports = router;
