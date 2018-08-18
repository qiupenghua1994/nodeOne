var express = require('express');
var router = express.Router();
var readFile = require('./file/readFile');
var exec = require('child_process');
var action = function (file) {
    return function (req, res, next) {
        if (req.params.action) {
            var action = req.params.action;
            if (action) {
                file[action](req, res, action);
            } else {
                return res.redirect("/");
            }
        } else {
            return res.redirect("/");
        }
    }
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/file/:action', action(readFile));
router.get('/bat/test', function (req,res) {
    exec.exec('./test.bat',function (err,stdout,stderr) {
        if (err) {
            window.reload();
            return;
        }
    });
});
router.post('/nodeOne/upgrade', function (req,res) {
    console.log(`nodeOne/upgrade`);
    var a = {
        message:'OK'
    };
    res.json(a);
});
router.post('/upgrade', function (req,res) {
    console.log(`upgrade`);
    var a = {
        message:'OK'
    };
    res.json(a);
});
router.get('/upgrade', function (req,res) {
    console.log(`1`);
    var a = {
        message:'OK'
    };
    res.json(a);
});

module.exports = router;
