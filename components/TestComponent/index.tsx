import PropTypes from "prop-types";


type TestComponentProps = { text: string }
export default function TestComponent(props: TestComponentProps) {
    return (
        <h1>{props.text}</h1>
    )
}
