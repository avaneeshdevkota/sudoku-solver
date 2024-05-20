'use client';
import React from 'react';
import Board from './Board';

export default function Page() {

    return (
        <main className = 'flex-col h-screen w-screen justify-center items-center'>
            <Board />
        </main>
    );
}