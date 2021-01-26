// 模板引擎
const jade = require('jade');
const fs = require('fs');

/*  jade */
// const str = jade.render('html');
// const str = jade.renderFile('./views/index.jade', {
//     pretty: true
// });
const str = jade.renderFile('./views/list.jade', {
    pretty: true,
    name: 'flow',
    stylejson: {
        width: "200px",
    },
    classArr: ['active'],
    htmlContent: '<div>name<div>',
});
// jade自动识别单双标签
console.log(str)

fs.writeFile('./build/index.html', str, (err) => {
    if(err) {
        console.log("失败")
    } else {
        console.log("成功")
    }
});