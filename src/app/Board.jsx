'use client';
import React, { useState } from 'react';

let board = []
  
    for (let i = 0; i < 9; i++) {
      board.push(Array(9).fill(0));
    }

export default function Board() {

    const [state, setState] = useState(board);

    const onPress = async () => {
        
        const response = await fetch('api/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({board: state})
        });
    
        const data = await response.json();
    
        setState(data.solution);
    }
  
    return (
        <>

        <main className = 'flex h-[90vh] w-screen justify-center items-center'>

            <div className = "grid grid-cols-9 grid-rows-9 gap-1">
                {state.map((row, i) => {
                return row.map((cell, j) => {
                    return (
                    <input key = {i + j}
                        className = "w-12 h-12 text-center border border-dotted border-purple-300 bg-black "
                        value = {cell === 0 ? '' : cell}
                        onChange = {(e) => {
    
                        let value = e.target.value;
    
                        if (value === '' || isNaN(value) || parseInt(value) < 0 || parseInt(value) > 9){
                            value = 0;
                        }
    
                        let newState = state.map((row, k) => {
    
                            if (k === i) {
                            return row.map((cell, l) => {
                                if (l === j) {
                                return parseInt(value);
                                }
                                return cell;
                            });
                            }
                            return row;
                        });
    
                        setState(newState);
                        }}
                    />
                    );
                });
                })}
            </div>

        </main>

        <section className = 'flex w-screen justify-center items-center'>

            <button className = "p-4 text-center border border-solid border-purple-300 bg-black" onClick = {onPress}>
                Solve!
            </button>

        </section>

    </>
    );
}