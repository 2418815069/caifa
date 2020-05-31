const mocker = require('mockjs');
const bodyParser = require('body-parser');
/*
 * base data for warp response
 */
const resBaseData = {
    code: 200,
    msg: '接口请求成功',
    success: true,
    data: {}
};

/*
 * 使用mockjs 处理模板数据
 *
 * @param {Object} data mockjs模板
 * @returns {Object} mockjs生成的数据
 */
function warpMockData(data) {
    let body = mocker.mock(data);
    return Object.assign({}, resBaseData, body);
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(function mockServer(req, res, next) {
        if (req.path.indexOf('/mockApi/') !== -1) {
            let mockFile = req.path.replace(/^\/mockApi/, '').replace(/\/\d+/g, '/0');
            try {
                const mockFn = require(`./mockApi${mockFile}`);
                setTimeout(() => {
                    res.json(warpMockData(mockFn(req, res)));
                }, 300);
                return;
            } catch (e) {
                console.error(e);
                res.json(resBaseData);
            }
            return;
        }
        next();
    });
};
