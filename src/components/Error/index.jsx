import { useRouteError } from "react-router";

const Error = () => {
    const error = useRouteError();

    return (
        <>
            <h1>Error: {error.message?.length > 0 ? error.message : 'There is no error message'}</h1>
            <pre>{error.status} - {error.statusText?.length > 0  ? error.statusText : 'There is no status text'}</pre>
        </>
    )
}

export default Error;