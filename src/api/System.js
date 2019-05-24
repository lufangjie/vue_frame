'use strict';

import Execute from 'api/request/Execute';

let System = Execute.extend({
    login(params) {
        return this.post('user/login', params);
    },
    logout(params) {
        return this.get('user/logout', params);
    }
});

export default new System();