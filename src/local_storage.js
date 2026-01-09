import { useEffect, useState } from "react";

export function useLocalStorageArray(key) {
    const [value, setValue] = useState(() => {
        try {
            const raw = localStorage.getItem(key);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    const setAndStore = (next) => {
        setValue(next);
        localStorage.setItem(key, JSON.stringify(next));
    };

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === key) {
                try {
                    const parsed = e.newValue ? JSON.parse(e.newValue) : [];
                    setValue(Array.isArray(parsed) ? parsed : []);
                } catch {
                    setValue([]);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [key]);

    const refresh = () => {
        try {
            const raw = localStorage.getItem(key);
            const parsed = raw ? JSON.parse(raw) : [];
            setValue(Array.isArray(parsed) ? parsed : []);
        } catch {
            setValue([]);
        }
    };

    return [value, setAndStore, refresh];
}

