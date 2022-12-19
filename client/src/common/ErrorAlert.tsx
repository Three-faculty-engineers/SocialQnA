import { useState } from "react";
import Alert from "react-bootstrap/esm/Alert";

interface Props {
    alert: string;
}

export function ErrorAlert(props: Props)
{
    const [show, setShow] = useState(true);
    return (
        <Alert variant="danger" onClose={() => setShow(false)} show={show} dismissible><p>{props.alert}</p></Alert>
    );
}