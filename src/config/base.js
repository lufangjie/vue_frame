'use strict';

const dev = process.env.NODE_ENV === 'development';
// development
const DEV_HOST = 'localhost';
const DEV_PORT = '9011';
// production
const PRO_HOST = 'wx.gisocn.com';
const PRO_PORT = '9011';

export default {
    server: {
        host: dev ? DEV_HOST : PRO_HOST,
        port: dev ? DEV_PORT : PRO_PORT
    }
}
