import { ClassNames } from "@emotion/react";
import { useEffect, useState } from "react";

const DelayedOutput = ({ children, delay }) => {
    const [showDelayed, setShowDelayed] = useState(false);

    useEffect(() => {
        window.setTimeout(() => {
          setShowDelayed(true);
        }, (delay ? delay : 1000));
      }, []);

  return (
    <>
    {showDelayed && (
        <>{children}</>
    )}
    </>
  );
};

export default DelayedOutput;
