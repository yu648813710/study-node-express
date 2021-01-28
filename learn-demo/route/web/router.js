
const createRouter = (express) => {
    const Router = express.Router();
    Router.get('/1.html', (req, res) => {
        res.send('我是文章').end();
    });
    Router.get('/test.html', (req, res) => {
        res.render('../static/test.ejs', {
            data: {
                text: '测试',
                box:'red',
            }
        }).end();
    });
    return Router;
}

module.exports = createRouter;