const BASE_NAME = 'todolist';
const STORE_NAME = 'index';

export interface TodoEvent {
    id: number,
    title: string,
}

let db: IDBDatabase;

function open(): Promise<IDBDatabase> {
    if (db) return Promise.resolve(db);
    const request = window.indexedDB.open(BASE_NAME);
    request.onupgradeneeded = () => {
        // 创建存储库
        const objectStore = request.result.createObjectStore(STORE_NAME, {
            keyPath: 'id', // 这是主键
            autoIncrement: true, // 实现自增
        });
        // 创建索引，在后面查询数据的时候可以根据索引查
        objectStore.createIndex('id', 'id', {unique: true});
        objectStore.createIndex('title', 'title', {unique: false});
    };

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            db = request.result;
            resolve(request.result);
        };
        request.onerror = (err) => reject(err);
    });
}

function close(): void {
    if (db) {
        db.close();
        db = null;
    }
}

// 添加任务
export function add(title: string): Promise<TodoEvent> {
    return new Promise(async (resolve, reject) => {
        const request = (await open())
            .transaction([STORE_NAME], 'readwrite')
            .objectStore(STORE_NAME)
            .add({title});

        request.onsuccess = (e) => {
            get(e.target.result)
                .then(resolve)
                .finally(close);
        };
        request.onerror = err => reject(err);
    });
}

// 查询全部任务据
export function getAll() {
    return new Promise(async (resolve, reject) => {
        const request = (await open())
            .transaction([STORE_NAME], 'readonly')
            .objectStore(STORE_NAME)
            .getAll();
        request.onsuccess = () => {
            resolve(request.result);
            close();
        };
        request.onerror = err => reject(err);
    });
}

// 根据id查询
export function get(id) {
    return new Promise(async (resolve, reject) => {
        const request = (await open())
            .transaction([STORE_NAME], 'readonly')
            .objectStore(STORE_NAME)
            .get(id);
        request.onsuccess = () => {
            resolve(request.result);
            close();
        };
        request.onerror = err => reject(err);
    });
}

// 删除任务
export function del(id) {
    return new Promise(async (resolve, reject) => {
        const request = (await open())
            .transaction([STORE_NAME], 'readwrite')
            .objectStore(STORE_NAME)
            .delete(id);
        request.onsuccess = () => {
            resolve();
            close();
        };
        request.onerror = err => reject(err);
    });
}

