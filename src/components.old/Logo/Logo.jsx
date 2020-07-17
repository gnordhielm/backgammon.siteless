import React from "react";
import { makeClassName } from "@scriptless/util";
import rootClassName from "./Logo.style";

const Logo = ({ className, withoutText = false }) => {
  return (
    <div className={makeClassName(rootClassName, className)}>
      <svg
        className="__image"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
      >
        <path
          className="__artwork"
          d="M23.06,39.5c-0.16,0-0.32-0.03-0.48-0.08l-5.94-2c-0.47-0.16-0.83-0.54-0.96-1.01s-0.03-0.99,0.29-1.37
	c3.41-4.08,9.16-12.76,9.4-25.07c0.02-0.82,0.68-1.47,1.5-1.47c0.01,0,0.02,0,0.03,0c0.83,0.02,1.49,0.7,1.47,1.53
	c-0.23,11.71-5.1,20.36-8.75,25.23l3.92,1.32c0.79,0.26,1.21,1.12,0.94,1.9C24.28,39.1,23.69,39.5,23.06,39.5z"
        />
        <circle className="__artwork" cx="35" cy="17" r="3" />
        <circle className="__artwork" cx="13" cy="17" r="3" />
      </svg>
      {!withoutText && <span>Backgammon</span>}
    </div>
  );
};

Logo.displayName = "Logo";

export default Logo;
