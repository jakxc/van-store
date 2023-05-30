import { useRouteError } from "react-router";

const Error = () => {
    const error = useRouteError();

    return (
        <>
            <h1>Error: {error.message}</h1>
            <pre>{error.status} - {error.statusText}</pre>
        </>
    )
}

export default Error;