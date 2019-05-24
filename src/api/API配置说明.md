# API配置说明

目录结构

```js
+-- src
|	+-- api
|		+-- request
|			+-- Execute.js	// 封装post，get, put等方法
|			+-- Request.js	// 封装的请求对象，所有Ajax请求的通用处理写在这里，后续可自行扩展
|   	+-- Scalar.js  	// 全局API和各模块API的初始化
|   	+-- System.js	// System模块的API配置，继承了Execute.js
|	+-- config
|		+-- base.js		// 服务端host和port端口的配置
|	+-- utils
|		+-- extend.js	// 通用的继承函数


// Scalar可以在工程根目录的入口js【main.js】进行初始化

import config from '@/config/base';
import Scalar from 'api/Scalar';

Scalar.init(config.server);
```

```javascript
// Scalar.js

'use strict';

import _ from 'lodash';
import System from 'api/System';

let Scalar = {
    init(config) {
        // 配置服务端的host和port
        let base = '://' + (config.host || 'localhost') + ':' + (config.port || 8080);
        _.defaults(config, {
            uri: {
                base: 'http' + base
            }
        });
        this.config = config;
        // 将全局的配置属性设置到System模块中
        this.system.config = this.config;
        return this;
    }
};
// 将System模块声明成Scalar对象的一个属性
Scalar.system = System;
export default Scalar;
```

```javascript
// System.js配置api

'use strict';

import Execute from 'api/request/Execute';

let System = Execute.extend({
    // 函数名称即API名称，不要使用get，post，json等已经在Execute中定义的函数名
    // params可设置的属性包括url、method、baseURL等，具体说明参考Request.js中的config属性
    login(params) {
        // 所有服务端的URL全部配置到这里，并且url后不要带任何参数
        return this.post('user/login', params);
    },
    logout(params) {
        return this.get('user/logout', params);
    }
});

// 这里export的是System实例
export default new System();
```

API的使用：

```javascript
import Scalar from 'api/Scalar';

// post api的调用
Scalar.system.login({
    // post请求的参数
    data: {
        account: '',
        password: ''
    }
 // Scalar.system.login()函数将返回一个Request的实例
 // execute()函数将执行请求操作
}).execute()
  .then(response => {
        // do success
    	// 这里的response不是axios返回的response
    	// 当前的response暂时只有一个【result】属性，对应axios的response的【data】属性，axios的response其他属性并未返回出来，参考Request.js里的parse()函数
        console.log(response);
    }, error => {
    	// api异常时通常不需要自行处理，可以在Request.js中做统一处理
        // do error
        console.log(error);
    });

// get api的调用
Scalar.system.logout({
    // params属性里将自动设置到请求的url后面
    params: {
        account: '',
        password: ''
    }
}).execute()
	.then(response => {
        // do success
        console.log(response);
    }, error => {
        // do error
        console.log(error);
    });

```

Scalar的初始化和各个模块API的定义和使用和数据中心基本相同，区别只是在request目录下的js文件不同，由于这里使用axios来进行Ajax请求，axios本身已实现异步功能，数据中心则是在jquery.ajax上重新进行封装，所以相较数据中心，这里的实现还是比较简单的。