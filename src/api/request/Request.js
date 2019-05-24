'use strict';

import ajax from 'axios';
import _ from 'lodash';

const CancelToken = ajax.CancelToken;

// 默认配置
const DEFAULT_CONFIG = {
    url: null,
    method: 'get',
    baseURL: null,
    transformRequest: [],
    transformResponse: [],
    headers: {},
    params: {},
    paramsSerializer: params => {
        return params
    },
    data: {},
    responseType: 'json'
};

let Request = function (options) {
    _.extend(this, DEFAULT_CONFIG, _.pick(options || {}, _.keys(DEFAULT_CONFIG)));
    this.init();
};

Request.prototype = {
    ajax: ajax,
    parse: function (response) {
        // 格式化结果，这里只返回data
        this.response = {
            data: response.data
        };
        return this.response;
    },

    cancelToken() {
        let _this = this;
        return new CancelToken(function executor(c) {
            // 取消当前请求的cancel函数
            _this.cancel = c;
        })
    },

    init() {
        this.ajax.interceptors.request.use(config => {
            // 拦截request
            return config;
        }, error => {
            console.error(error);
            return Promise.reject({
                error: error,
                request: this
            });
        });
        this.ajax.interceptors.response.use(response => {
            // 拦截response
            return this.parse(response);
        }, error => {
            console.error(error);
            return Promise.reject({
                request: this,
                xhr: error.request,
                statue: error.request.status,
                message: error.message,
            });
        });
    },

    execute() {
        let config = _.pick(this, Request.config);
        _.each(config, function (value, key) {
            config[key] = _.result(this, key);
        }.bind(this));
        return this.ajax(config);
    }
};

Request.config = [
    'url',                  // 用于请求的服务器URL
    'method',               // 创建请求时使用的方法，默认为get
    'baseURL',              // baseURL将自动添加在url前面，除非url是一个绝对的URL
    'cancelToken',          // 指定用于取消请求的cancel token
    'transformRequest',     // 允许在向服务器发送数据前，修改请求数据，只能用在PUT、POST和PATCH，且后面数组中的函数必须返回一个字符串，或ArrayBuffer，或Stream
    'transformResponse',    // 在传递给then/catch前，允许修改响应数据
    'headers',              // 发送的自定义请求头
    'params',               // 即将与请求一起发送的URL参数
    'paramsSerializer',     // 对params序列化的函数
    'data',                 // 请求体发送的数据
    'responseType'          // 服务器响应的数据类型，可以是'arraybuffer','blob','document','json','text','stream'
];

export default Request;
