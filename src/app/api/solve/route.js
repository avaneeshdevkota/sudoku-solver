import { NextResponse } from "next/server";

function solve(board) {

    const empty = findEmpty(board);

    if (!empty) {
        return board;
    }

    const [row, col] = empty;

    for (let i = 1; i < 10; i++) {

        if (isValid(board, i, empty)) {
            board[row][col] = i;

            if (solve(board)) {
                return board;
            }

            board[row][col] = 0;
        }
    }

    return false;
}

function findEmpty(board) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }

    return false;
}

function isValid(board, num, pos) {

    const [row, col] = pos;

    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && i !== col) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num && i !== row) {
            return false;
        }
    }

    const x = Math.floor(row / 3) * 3;
    const y = Math.floor(col / 3) * 3;

    for (let i = x; i < x + 3; i++) {
        for (let j = y; j < y + 3; j++) {
            if (board[i][j] === num && i !== row && j !== col) {
                return false;
            }
        }
    }

    return true;
}

export async function POST(req) {

    const { board } = await req.json();
    const solution = solve(board);
    return NextResponse.json({ solution });
}

export async function GET() {

    return NextResponse.json({ message: "Sudoku Solver API" });
}