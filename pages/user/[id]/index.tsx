import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import TestComponent from '~/TestComponent';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<{ id: string }> = async (context) => {
    const {id} = context.params as { id: string };
    return ({props: {id}});
};

export default function UserPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <TestComponent text={`用户主页`}/>
            <TestComponent text={`${props.id}`}/>
        </>
    );
}
