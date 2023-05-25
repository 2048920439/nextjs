import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            'user/info/001'
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<{ id: string }> = async (context) => {
    const {id} = context.params as { id: string }
    return ({props: {id}});
}

export default function UserInfoPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            用户信息: {props.id}
        </div>
    )
}
