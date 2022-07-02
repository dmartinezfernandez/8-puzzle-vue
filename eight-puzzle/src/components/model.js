"use strict";
import { reactive } from 'vue'

// https://www.cs.princeton.edu/courses/archive/spr10/cos226/assignments/8puzzle.html
// https://www.cs.princeton.edu/courses/archive/spring20/cos226/assignments/8puzzle/specification.php

/**
 * @param {Number[]} arr
 */
let parity = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] != 9) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] != 9 && arr[i] > arr[j])
                    count++;
            }
        }
    }
    return count % 2;
};

/**
 * @param {Number[]} arr
 * 
 * TO DO:
 * -- To shuffle an array a of n elements (indices 0..n-1):
 * for i from n−1 downto 1 do
 *      j ← random integer such that 0 ≤ j ≤ i
 *      exchange a[j] and a[i]
 * 
 * [a[i], a[j]] = [a[j], a[i]]
 */
let randomShuffle = (arr) => {
    let arr1 = [], arr2 = [], par = parity(arr);
    do {
        arr1 = [...arr];
        arr2 = [];
        while (arr1.length > 0) {
            let i = Math.floor(Math.random() * arr1.length);
            arr2.push(arr1.splice(i, 1)[0]);
        }
    } while (parity(arr2) != par); // Solvable condition.
    for (let i = 0; i < arr.length; i++)
        arr[i] = arr2[i];
};

/**
 * @param {Game} game
 */
let kidsShuffle = (game) => {
    game.board = [...target];
    const crazy = 1024;
    let k = 0;
    let n = 1 + Math.floor(Math.random() * 5); // Prevent infinite loops.
    let next = false;
    for (let i = 0; i < n; i++) {
        next = false;
        while (!next) {
            if (++k >= crazy) // Prevent infinite loops.
                break;
            let j = Math.floor(Math.random() * 9);
            if (game.board[j] == j + 1 && game.canSlide(j)) {
                game.slide(j);
                next = true;
            }
        }
    }
};


const target = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Game {
    constructor() {
        this.board = [...target];
        this.count = 0;
        this.initialize = () => {
            for (let i = 0; i < target.length; i++)
                this.board[i] = target[i];
            this.count = 0;
        };
        this.shuffle = (kidsMode) => {
            if (!kidsMode) {
                randomShuffle(this.board);
            }
            else {
                kidsShuffle(this);
            }
            this.count = 0;
        };
        /**
         * @param {number} i
         */
        this.isBlank = (i) => {
            return this.board[i] == 9;
        };
        this.getBlankIndex = () => {
            return this.board.indexOf(9);
        };
        /**
         * @param {number} i
         */
        this.getRow = (i) => {
            return Math.trunc(i / 3);
        };
        /**
         * @param {number} i
         */
        this.getColumn = (i) => {
            return i % 3;
        };
        /**
         * @param {number} i
         */
        this.canSlide = (i) => {
            let j = this.getBlankIndex();
            let rowI = this.getRow(i), columnI = this.getColumn(i), rowJ = this.getRow(j), columnJ = this.getColumn(j);
            return (rowI == rowJ && Math.abs(columnI - columnJ) == 1)
                || (columnI == columnJ && Math.abs(rowI - rowJ) == 1);
        }
        /**
         * @param {number} i
         */
        this.slide = (i) => {
            let canSlide = this.canSlide(i);
            if (canSlide) {
                let j = this.getBlankIndex();
                let k = this.board[j];
                this.board[j] = this.board[i];
                this.board[i] = k;
                this.count++;
            }
            return canSlide;
        };
    };
}

export default reactive({
    clicks: [],
    game: new Game()
});
