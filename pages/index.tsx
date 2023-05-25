import {GetStaticProps, InferGetStaticPropsType} from "next";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{ id: string }> = async () => {
    return {props: {id: '2048920439'}}
}

export default function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            <h1>The Home Page</h1>
            <Link href={`/user/info/${props.id}`}>To User Home Page</Link>
        </div>
    )
}
