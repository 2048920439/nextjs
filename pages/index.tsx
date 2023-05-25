import {GetStaticProps, InferGetStaticPropsType} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";

export const getStaticProps: GetStaticProps<{ id: string }> = async () => {
    // 模拟后端延迟
    await new Promise(resolve => setTimeout(resolve, 200))
    return {props: {id: '2048920439'}}
}

export default function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const [input, setInput] = useState('')

    const router = useRouter()

    function onToClick() {
        input && router
            .push({pathname: `/user/info/[id]`, query: {id: input}})
            .then(() => setInput(''))
    }

    return (
        <div>
            <h1>The Home Page</h1>
            <Link href={`/user/info/${props.id}`}>To HomeInfo</Link>
            <br/>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={onToClick}>跳转</button>
        </div>
    )
}
