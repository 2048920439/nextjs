import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {get, TodoEvent} from '../DB';

export default function TodoDetails() {
    const router = useRouter();
    const [todoEvent, setTodoEvent] = useState<TodoEvent>();

    useEffect(()=>{
        get(Number(router.query.id||0))
            .then(setTodoEvent);
    },[router])


    return (
        <>
            <h1>任务详情</h1>
            <h3>id:{todoEvent?.id}</h3>
            <h3>title:{todoEvent?.title}</h3>
        </>
    );
}
