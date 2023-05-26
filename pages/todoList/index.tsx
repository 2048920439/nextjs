import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {add, del, getAll, open, TodoEvent} from './DB';
import css from './style.module.scss';

export default function TodoListPage() {
    const [list, setList] = useState([]);

    useEffect(() => { getAll().then(setList);}, []);

    function onDel(id: number, index: number) {
        del(id)
            .then(() => {
                const l = [...list];
                l.splice(index, 1);
                setList(l);
            });
    }

    function onAdd(title: string) {
        add(title)
            .then(e => setList([...list, e]));
    }

    return (
        <div className={css.page}>
            <Header onAdd={onAdd}/>
            <Content list={list} onDel={onDel}/>
        </div>
    );
}


type headerProps = { onAdd: (title: string) => void }

function Header(props: headerProps) {
    const [value, setValue] = useState('');

    function onAddClick() {
        if (!value) return;
        props.onAdd(value);
        setValue('');
    }

    return (
        <div className={css.header}>
            <span>To Do List</span>
            <div className={css.addForm}>
                <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                <button onClick={onAddClick}>添加</button>
            </div>
        </div>
    );
}

type contentProps = { list: TodoEvent[], onDel: (id: number, index: number) => void }

function Content(props: contentProps) {
    return (
        <div className={css.content}>
            {
                props.list.map((e, index) =>
                    <Item key={e.id} data={e} onDel={() => props.onDel(e.id, index)}/>,
                )
            }
        </div>
    );
}

type ItemProps = { data: TodoEvent, onDel: (index: number) => void }

function Item(props: ItemProps) {
    const router = useRouter();

    function onDetailsClick() {
        router.push(`/todoList/${props.data.id}`);
    }

    return (
        <div className={css.item}>
            <div className={css.title}>{props.data.title}</div>
            <div className={css.operation}>
                <button onClick={onDetailsClick}>详情</button>
                <button onClick={props.onDel}>删除</button>
            </div>
        </div>
    );
}


