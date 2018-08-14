var xlsx = require('node-xlsx');

var readFile = {
    readXlsx:function (req,res) {
        var path = 'upload/中电建大型设备分类统计.xlsx';
        var data = xlsx.parse("./" + path);

        var data = data[0]['data'];
        var sheetNum = data.length;
        var titles = data[0];
        var titleSize = titles.length;
        var sql = 'INSERT INTO cs_equip (' +
            'equip_cs_no,' +
            'equip_cs_name,' +
            'equip_manu_no,' +
            'manu_date,' +
            'property_unit_id,' +
            'project_name,' +
            'equip_status,' +
            'equip_company,' +
            'linkman,' +
            'phone,' +
            'use_date,' +
            'province,' +
            'city,' +
            'county,type_id' +
            ') VALUES ';
        var sqlValues = '';
        data.splice(0, 1);
        var unit = {
            "电建市政公司": 1,
            "水电八局": 2,
            "水电七局": 3,
            "水电四局": 4,
            "水电五局": 5,
            "上海电建": 6,
            "山东电建三公司": 7,
            "水电三局": 8,
            "水电十一局": 9,
            "电建核电公司": 10,
            "电建湖北公司": 11,
            "河北工程公司": 12,
            "山东电建一公司": 13,
            "水电十六局": 14,
            "基础局": 15,
            "水电六局": 16,
            "河南工程公司": 17,
            "重庆工程公司": 18,
            "贵州工程公司": 19,
            "水电十四局": 20,
            "电建港航公司": 21
        };
        data.forEach(function (item, index) {

            item[4] = unit[item[4]];
            item[6] = item[6]=='在用'?1:7;
            for(var i=0;i<item.length;i++){
                item[i] = item[i]?"'"+item[i].toString().replace(/\s/g, "")+"'":"''";
            }
            sqlValues+='('+item.toString()+'),';
        });


        sqlValues = sqlValues.substr(0, sqlValues.length - 1);
        sql += sqlValues;
        console.log(sql);
        res.json(sql);

    }
};

module.exports = readFile;