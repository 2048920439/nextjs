import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: [], fallback: true,
})

type propsType = { year: string | null, month: string | null, day: string | null }
export const getStaticProps: GetStaticProps<propsType> = async context => {
    const date = context.params!.date as string[]
    if (date.length > 3) return {notFound: true}
    const [year = null, month = null, day = null] = date
    return {
        props: {
            year, month, day,
        },
    }
}

export default function BLog(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const {year, month, day} = props
    return (
        <h1>
            日期: {`${year} / ${month} / ${day}`}
        </h1>
    )
}
