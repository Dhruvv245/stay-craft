"use client";

import { useState } from "react";

export default function Counter({ users }) {
  const [count, setCount] = useState(0);
  return (
    <div>
        <ul>{users.map(user=>(
            <li key={user.id}>{user.name}</li>
        ))}</ul>
      <button
        onClick={() => {
          setCount((cnt) => cnt + 1);
        }}
      >
        {count}
      </button>
    </div>
  );
}
