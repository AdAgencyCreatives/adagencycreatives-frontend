import React, { useEffect, useRef } from 'react';
import eventEmitter from "./EventEmitter";

const ResizableDiv = ({ children, className, uid }) => {
    const divRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                eventEmitter.emit('ee_custom_event_height_changed', { 'uid': uid, 'height': entry.contentRect.height });
                // console.log('Height:', entry.contentRect.height);
            }
        });

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current);
            }
        };
    }, []);

    return (
        <div uid={uid} ref={divRef} className={className}>
            {children}
        </div>
    );
};

export default ResizableDiv;
