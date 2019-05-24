'use strict';

import extend from '@/utils/extend';
import Request from 'api/request/Request';

let Execute = function () {};

Execute.prototype = {
    post(url, params) {
        params = params || {};
        params.method = 'post';
        return this._execute(url, params);
    },

    get(url, params) {
        params = params || {};
        params.method = 'get';
        return this._execute(url, params);
    },

    json(url) {
        let params = {};
        params.method = 'get';
        params.baseUrl = '';
        return this._execute(url, params);
    },

    _execute(url, params) {
        let base = (params.baseUrl !== undefined) ? params.baseUrl : this.config.uri.base;
        params.url = url;
        params.baseURL = base;
        return new Request(params);
    }
};

Execute.extend = extend;

export default Execute;
