import React from "react";
import starPng from "/images/Home_Blue_Star.png";

export default function HomeBlueStar({ className = "" }) {
  return (
    <img
      src={starPng}
      className={className}
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  );
}
