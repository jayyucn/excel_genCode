"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const Fse = __importStar(require("fs-extra"));
class Path {
    static ReadTxt(path) {
        return fs_1.readFileSync(path, { encoding: 'utf-8' });
    }
    static WriteTxt(path, content) {
        Fse.ensureFileSync(path);
        Fse.writeFileSync(path, content, { encoding: 'utf-8' });
        // return readFileSync(path,{encoding: 'utf-8'});
    }
    static WriteJson(path, jsonString) {
        Fse.ensureFileSync(path);
        Fse.writeJsonSync(path, jsonString);
    }
    static ReaddirSync(url) {
        let list = [];
        let itemList = fs_1.readdirSync(url);
        for (let item of itemList) {
            let itemPath = url + '/' + item;
            let stat = fs_1.statSync(itemPath);
            if (stat && stat.isFile()) {
                list.push(itemPath);
            }
            else if (stat && stat.isDirectory()) {
                let newList = Path.ReaddirSync(itemPath);
                list = list.concat(newList);
            }
        }
        return list;
    }
    static GetFGUIResList(resPath) {
        let list = [];
        let itemList = fs_1.readdirSync(resPath);
        for (let item of itemList) {
            let itemPath = resPath + '/' + item;
            let stat = fs_1.statSync(itemPath);
            if (stat && stat.isFile())
                list.push(item);
        }
        return list;
    }
    static Exists(path) {
        return fs_1.existsSync(path);
    }
    static CreateDirectory(path) {
        Fse.ensureDirSync(path);
    }
    static GetDirectoryPath(path) {
        if (Path.IsFile(path)) {
            return path.slice(0, path.lastIndexOf('/'));
        }
        if (path.endsWith('/'))
            return path.slice(0, path.lastIndexOf('/') + 1);
        return path;
    }
    static GetFileNameWithoutExtension(name) {
        name = name.slice(name.lastIndexOf('/') + 1);
        return name.split('.')[0];
    }
    static GetExtension(name) {
        return name.split('.')[1];
    }
    static IsFile(path) {
        if (!Fse.pathExistsSync(path))
            return false;
        let stat = fs_1.statSync(path);
        return stat && stat.isFile();
    }
    static IsDirectory(path) {
        if (!Fse.pathExistsSync(path))
            return false;
        let stat = fs_1.statSync(path);
        return stat && stat.isDirectory();
    }
    static CheckPath(path, isFile = true) {
        if (isFile)
            path = path.substring(0, path.lastIndexOf('/'));
        let dirs = path.split('/');
        let target = "";
        let first = true;
        for (let dir of dirs) {
            if (first) {
                first = false;
                target += dir;
                continue;
            }
            if (dir)
                continue;
            target += "/" + dir;
            if (!Path.Exists(target)) {
                Path.CreateDirectory(target);
            }
        }
    }
}
exports.default = Path;
