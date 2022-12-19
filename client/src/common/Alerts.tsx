import Alert from "react-bootstrap/esm/Alert";
import { ErrorAlert } from "./ErrorAlert";


interface Props {
    alerts: string[]
}
export function Alerts(props: Props)
{
    const alerts: JSX.Element[] = [];
    console.log("aaaa");
    props.alerts.forEach((alert, index) => alerts.push(<ErrorAlert key={index} alert={alert}/>))
    return (
        <div>
            {alerts}
        </div>
    );
}