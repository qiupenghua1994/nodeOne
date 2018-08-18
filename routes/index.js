var express = require('express');
var router = express.Router();
var readFile = require('./file/readFile');
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

router.post('/upgrade', function (req,res) {
    console.log(`sdnodeOne/upgrade`);
    var a = {
        message:'测试 OK'
    };
    res.json(a);
});



module.exports = router;
