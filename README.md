# parse-directorys

把目录结构解析成一个目录树对象

##### Usage

​    

    npm install parse-directorys --save

    ...

    var parser = require("parse-directorys");

    parser(".....");


最终返回的结构类型

```javascript
name        目录名
type        类型(file/folder)
fullPath    全路径
parent      父级目录路径
files       当前目录下所有文件
            parent      父级目录路径
            fullPath    全路径
            name        文件名
            size        文件大小(kb)
            extName     文件结构
            mimeType    mime类型
folders     当前目录下所有目录(结构同上)
            name        目录名
            type        类型(file/folder)
            fullPath    全路径
            parent      父级目录路径
            files       当前目录下所有文件
                        parent      父级目录路径
                        fullPath    全路径
                        name        文件名
                        size        文件大小(kb)
                        extName     文件结构
                        mimeType    mime类型
            folders      当前目录下所有目录(结构同上)
```

##### 测试

```bash
git clone https://github.com/rwson/parse-directorys.git

cd parse-directorys

//	修改server.js里面"/Users/Mrson/My/Projects/Uquiz/uquiz-ng4/src"到自己机器的任意路径

node server.js

访问http://localhost:3000查看结果
```

