import React, { useEffect, Fragment, useState } from "react";
import { Alert } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

/*
export default function NotificatonToaster(props) {

    const count = props.count || 2;
    const timer = props.timer || 5;

    const [notifications, setNotifications] = useState([]);
    const [ready, setReady] = useState(false);


    const pushNotice = (newNotifications) => {

        try {
            setNotifications(notifications.concat(newNotifications));
        } catch (err) {
            setNotifications(notifications.concat([{ message: "Array should be provided to report errors", type: "danger" }]));
        }

    };
    if (!ready) {
        window.notify = pushNotice;
        setReady(true);
    }

    let alerts = []

    try {
        for (let i = 0; i < notifications.length && i < count; i++) {
            alerts.push(
                <Alert key={i} color={notifications[i].type || "danger"} isOpen={true} toggle={(e) => { e.currentTarget.parentNode.style.display = "none"; }} className="w-100">
                    {notifications[i].message}
                </Alert>);
            setTimeout(() => { setNotifications(notifications.slice(count)); }, timer * 1000);
        }

        //console.log(alerts.length + " Pushed");

    } catch (err) {
        setNotifications(notifications.concat([{ message: "Array should be provided", type: "danger" }]));
    }
    return alerts.length ?
        <div className="fixed-top d-inline-block px-3 w3-mobile mt-3" style={{ right: 0, left: "auto", width: "25%" }}>
            {alerts}
        </div>
        : null;
    ;
}*/


export default function NotificationToaster(props) {

    const [ready, setReady] = useState(false);
    const { addToast } = useToasts();

    function pushNotice(notificationArray = []) {

        notificationArray.forEach((item) => {

            //success,error,warning,info
            item.type === "danger" && (item.type = undefined);

            addToast(item.message, { appearance: item.type || 'error' })
        });

    }

    if (!ready) {
        setReady(true);
        window.notify = pushNotice;
    }
    return null
}