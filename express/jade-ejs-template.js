// 模板引擎
const jade = require('jade');
const ejs = require('ejs');


/*  jade */
// const str = jade.render('html');
// const str = jade.renderFile('./views/index.jade', {pretty: true});

// console.log(str)


/*  ejs */

ejs.renderFile('./views/index.ejs', {
    name: 'sevenflow'
}, (err, data) => {
    if(err) {
        console.log("编译失败");
    } else {
        console.log(data);
    }
})