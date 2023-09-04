<template>
    <div class="game">
        <Board
            :boardSize="boardSize"
            :mines="mines"
            :minePositions="placeMines()"
            :createBoard="createBoard"
        />
    </div>
</template>

<script>
import Board from "./Board.vue";

export default {
    props: ["boardSize", "mines"],
    components: { Board },
    methods: {
        placeMines() {
            const positions = [];
            const generateNumber = () => {
                return Math.floor(Math.random() * this.boardSize);
            };

            while(positions.length < this.mines)
            {
                const position = {
                    x: generateNumber(),
                    y: generateNumber()
                };

                if(positions.some((item) => item.x == position.x && item.y == position.y))
                    continue;
                positions.push(position);
            }

            return positions;
        },
        createBoard(boardSize, minePositions) {
            const board = Array(boardSize).fill().map(() => Array(boardSize));
            const isMine = (i, j) => {
                return minePositions.some((item) => item.x == i && item.y == j);
            };
            const markTiles = (i, j) => {
                [
                    { x: i-1, y: j-1 }, { x: i-1, y: j }, { x: i-1, y: j+1 }, 
                    { x: i, y: j-1 },  { x: i, y: j+1 }, 
                    { x: i+1, y: j-1 }, { x: i+1, y: j }, { x: i+1, y: j+1 }
                ].forEach(({ x, y }) => {
                    if(x < 0 || x >= boardSize || y < 0 || y >= boardSize)
                        return;
                    if(board[x][y].isMine)
                        return;
                    board[x][y].value++;
                });
            };

            // creating tiles
            for(let i=0; i<boardSize; i++)
                for(let j=0; j<boardSize; j++)
                    board[i][j] = { 
                        x: i,
                        y: j,
                        isMine: isMine(i, j),
                        value: 0,
                        hidden: true,
                        flagged: false
                    };

            // marking mines and adding numbers to adjacent squares
            for(let i=0; i<boardSize; i++)
                for(let j=0; j<boardSize; j++)
                    if(board[i][j].isMine)
                    {
                        board[i][j].value = null;
                        markTiles(i, j);
                    }

            return board;
        }
    }
};
</script>

<style>
@import "../assets/css/game.css";
</style>