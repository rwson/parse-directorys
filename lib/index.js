/**
 * 解析目录变成一个目录树对象
 */

var fs = require("fs"),
    path = require("path"),
    os = require("os"),
    folderObj = {
        name: "folder",
        type: "folder",
        fullPath: "",
        parent: "",
        files: [],
        folders: []
    };

/**
 * 除法兼容
 * @param num1
 * @param num2
 * @returns {number}
 */
function div(num1, num2) {
    var t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 获取某个目录下第一级所有文件(夹)
 * @param root  被读取目录
 * @returns {
 *      @attribute  files   Array.<T>
 *      @attribute  files   Array.<String>
 * }
 */
function getAll(root) {
    var files = [],
        res = {
            files: [],
            folders: []
        },
        cur, curPath, stat;
    try {
        files = fs.readdirSync(root);
    } catch (e) {
        return null;
    }

    files.forEach(function (file) {
        cur = file;
        if (!(/^\.[\w\W]+/.test(cur)) && cur.charAt(0) !== "") {
            curPath = path.join(root, cur);
            stat = fs.lstatSync(curPath);
            if (stat.isFile()) {
                res.files.push({
                    parent: root,
                    fullPath: curPath,
                    name: cur,
                    size: div(stat.size, 1024) + "kb"
                });
            } else if (stat.isDirectory()) {
                res.folders.push(curPath);
            }
        }
    });
    return res;
}

/**
 * 深拷贝对象
 * @param obj1
 * @param obj2
 * @returns {object}
 */
function copy(obj1, obj2) {
    var res = {};
    if (JSON.stringify(obj1).length > 3) {
        res = copy({}, obj1);
    }
    for (var i in obj2) {
        if (obj2.hasOwnProperty(i)) {
            //  属性值为对象且不为空对象
            res[i] = (typeof(obj2[i]) === "object" && JSON.stringify(obj2[i]).length > 3 ) ? copy({}, obj2[i]) : obj2[i];
        }
    }
    return res;
}

/**
 * 解析方法
 * @param root  根路径
 * @returns {
 *      @attribute  name        目录名
 *      @attribute  type        类型(file/folder)
 *      @attribute  fullPath    全路径
 *      @attribute  parent      父级目录路径
 *      @attribute  files       当前目录下所有文件
 *                  @attribute      parent      父级目录路径
 *                  @attribute      fullPath    全路径
 *                  @attribute      name        文件名
 *                  @attribute      size        文件大小(kb)
 *     @attribute  folders      当前目录下所有目录
 * }
 */
function parser(root) {
    var matches = root.split("/"),
        len = matches.length,
        res = copy(folderObj, {
            fullPath: root,
            name: len > 0 ? matches[len - 1] : os.homedir(),
            parent: ""
        }),
        all = getAll(root);
    if (all.folders.length) {
        res.folders = res.folders.concat(all.folders);
        all.folders.forEach(function (src) {
            res.folders = parser(src);
        });
    }
    if (all.files.length) {
        res.files = res.files.concat(all.files);
    }
    matches.pop();
    res.parent = matches.join("/");
    return res;
}

module.exports = parser;