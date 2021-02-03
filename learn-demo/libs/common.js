const crypto = require('crypto');
module.exports = {
    MD5_SUFFIX: 'sevenflow',
    md5: (str) => {
        // md5 签名
        const obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
};