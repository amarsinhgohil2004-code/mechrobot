import { useEffect, useState } from "react";
import { API_URL } from "./config";

export default function useSettings() {
    const [settings, setSettings] = useState({
        whatsapp: "913666648568",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        fetch(`${API_URL}/api/settings`)
            .then((res) => res.json())
            .then((data) => {
                setSettings(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return settings;
}