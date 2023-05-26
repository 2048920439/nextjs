import {useRouter} from 'next/router';
import {useState} from 'react';
import {get, TodoEvent} from '../DB';

export default function TodoDetails() {
    const router = useRouter();
    const [todoEvent, setTodoEvent] = useState<TodoEvent>();
    get(Number(router.query.id)).then(setTodoEvent);

    return (
        <>
            <h1>任务详情</h1>
            <h3>id:{todoEvent?.id}</h3>
            <h3>title:{todoEvent?.title}</h3>
        </>
    );
}
