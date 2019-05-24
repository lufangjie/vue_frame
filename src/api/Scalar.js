'use strict';

import _ from 'lodash';
import System from 'api/System';

let Scalar = {
    init(config) {
        let base = '://' + (config.host || 'localhost') + ':' + (config.port || 8080);
        _.defaults(config, {
            uri: {
                base: 'http' + base
            }
        });
        this.config = config;
        this.system.config = this.config;
        return this;
    }
};
Scalar.system = System;
export default Scalar;
