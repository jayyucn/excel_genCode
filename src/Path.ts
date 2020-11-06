import {readdirSync,statSync,exists,existsSync,readFileSync} from 'fs';
import * as Fse from 'fs-extra';

export default class Path
{
    public static ReadTxt(path: string): string
    {
        return readFileSync(path,{encoding: 'utf-8'});
    }

    public static WriteTxt(path: string,content: string)
    {
        Fse.ensureFileSync(path);
        Fse.writeFileSync(path,content,{encoding: 'utf-8'});
        // return readFileSync(path,{encoding: 'utf-8'});
    }

    public static WriteJson(path: string,jsonString: any)
    {
        Fse.ensureFileSync(path);
        Fse.writeJsonSync(path,jsonString);
    }

    public static ReaddirSync(url: string)
    {
        if(!url.endsWith("/")) {
            url += "/";
        }
        let list: string[] = [];
        let itemList = readdirSync(url);
        for(let item of itemList)
        {
            let itemPath = url + '/' + item;
            let stat = statSync(itemPath);
            if(stat && stat.isFile())
            {
                if(item.indexOf('.xls') != -1 && !item.startsWith('~')){
                    list.push(itemPath);
                }
            }
            else if(stat && stat.isDirectory())
            {
                let newList = Path.ReaddirSync(itemPath);
                list = list.concat(newList);
            }
        }
        return list;
    }


    public static GetFGUIResList(resPath: string): string[]
    {
        let list: string[] = [];
        let itemList = readdirSync(resPath);
        for(let item of itemList)
        {
            let itemPath = resPath + '/' + item;
            let stat = statSync(itemPath);
            if(stat && stat.isFile())
                list.push(item);
        }
        return list;
    }

    public static Exists(path: string)
    {
        return existsSync(path);
    }

    public static CreateDirectory(path: string)
    {
        Fse.ensureDirSync(path);
    }

    public static GetDirectoryPath(path: string)
    {
        if(Path.IsFile(path))
        {
            return path.slice(0,path.lastIndexOf('/'))
        }
        if(path.endsWith('/'))
            return path.slice(0,path.lastIndexOf('/') + 1);
        return path;
    }

    public static GetFileNameWithoutExtension(name: string): string
    {
        name = name.slice(name.lastIndexOf('/') + 1);
        return name.split('.')[0]
    }

    public static GetExtension(name: string): string
    {
        return name.split('.')[1];
    }

    public static IsFile(path: string)
    {
        if(!Fse.pathExistsSync(path))
            return false
        let stat = statSync(path);
        return stat && stat.isFile();
    }

    public static IsDirectory(path: string)
    {
        if(!Fse.pathExistsSync(path))
            return false
        let stat = statSync(path);
        return stat && stat.isDirectory();
    }

    public static CheckPath(path: string,isFile = true)
    {
        if(isFile) path = path.substring(0,path.lastIndexOf('/'));
        let dirs: string[] = path.split('/');
        let target = "";

        let first = true;
        for(let dir of dirs)
        {
            if(first)
            {
                first = false;
                target += dir;
                continue;
            }
            if(dir) continue;
            target += "/" + dir;
            if(!Path.Exists(target))
            {
                Path.CreateDirectory(target);
            }
        }
    }

    

}