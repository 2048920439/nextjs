import Link from 'next/link';

export default function notFoundPage() {
    return (
        <>
            <h1>
                This is 404
            </h1>
            <Link href={'/'} replace={true}>Goto home page</Link>
        </>

    );
}
