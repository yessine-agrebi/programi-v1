'use client';
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
}
