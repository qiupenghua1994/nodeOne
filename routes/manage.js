var express = require('express');
var router = express.Router();
var exec = require('child_process');
var os = require('os');

//更新重启node
router.post('/restartNode',restartNode);
router.get('/restartNode',restartNode);
//更新重启node
router.post('/restartVue', restartVue);
router.get('/restartVue', restartVue);

function restartVue(req,res){
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
}
function restartNode(req,res) {
    console.log('restart begin');
    console.log('tupe',os.type());
    var ret = {
        message:'manage restart node 12'
    };
    res.json(ret);

    if(os.type().indexOf('indows')){
        console.log('restart on windows11')
        exec.exec('restart.bat',function (err,stdout,stderr) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('restart on windows success')
        });
    }else{
        console.log('restart on linux')
        exec.exec('./restart.bat',function (err,stdout,stderr) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('restart on windows success')
        });
    }
}

module.exports = router;
