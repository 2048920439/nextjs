import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<{ id: string }> = async (context) => {
    const {id} = context.params as { id: string }
    return ({props: {id}});
}

export default function UserPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            用户主页: {props.id}
        </div>
    )
}
