// components/AuthForm.tsx
'use client';

import { useState } from 'react';

interface Props {
  type: 'login' | 'register';
}

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${type} with:`, { email, password });
    // TODO: Call your backend (Spring Boot) later
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {type === 'login' ? 'Login' : 'Create Account'}
      </button>
    </form>
  );
}
