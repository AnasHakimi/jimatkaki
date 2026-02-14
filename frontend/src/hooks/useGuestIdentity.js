import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGuestIdentity = () => {
    const [guestId, setGuestId] = useState(null);

    useEffect(() => {
        let storedId = localStorage.getItem('guest_id');
        if (!storedId) {
            storedId = uuidv4();
            localStorage.setItem('guest_id', storedId);
        }
        setGuestId(storedId);
    }, []);

    return guestId;
};
