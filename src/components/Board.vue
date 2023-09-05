<template>
    <div :class="{ board: true, 'game-over': gameOver }">
        <Header :flags="flags" :icon="icon" :seconds="seconds" />

        <div v-for="(row, i) in board" :key="i" class="row">
            <Row :row="row" @selected="openTile" @flagged="flagTile" />
        </div>
    </div>
</template>

<script>
import Row from "./Row.vue";
import Header from "./Header.vue";

export default {
    props: ["boardSize", "mines", "minePositions", "createBoard", "gameOver"],
    emits: ["game-over"],
    components: { Row, Header },
    data() {
        return {
            flags: this.mines,
            icon: "smiling",
            seconds: 0,
            board: this.createBoard(this.boardSize, this.minePositions),
            playing: false
        };
    },
    computed : {
        openedTiles() {
            let count = 0;

            for(let i=0; i<this.boardSize; i++)
                for(let j=0; j<this.boardSize; j++)
                    if(!this.board[i][j].hidden)
                        count++;

            return count;
        }
    },
    watch: {
        playing() {
            const timer = setInterval(() => {
                this.seconds += 1;
                if(this.seconds === 999 || this.gameOver)
                    clearInterval(timer);
            }, 1000);
        }
    },
    methods: {
        openTile(x, y) {
            this.playing = true;

            // only tiles that are not flagged can be opened
            if(this.board[x][y].flagged)
                return;
            else
                this.board[x][y].hidden = false;

            // game ends when clicking on a mine
            if(this.board[x][y].isMine)
            {
                this.icon = "dizzy";
                this.$emit("game-over", false, this.seconds);
                return;
            }

            // game ends when all safe tiles are open
            if(this.openedTiles === this.boardSize ** 2 - this.mines)
            {
                this.icon = "cool";
                this.$emit("game-over", true, this.seconds);
                return;
            }

            // open more tiles after cliking on one not surrounded by mines
            if(this.board[x][y].value === 0)
            {
                this.board[x][y].hidden = true;
                this.floodFill(x, y);
            }
        },
        flagTile(x, y) {
            this.playing = true;
            
            if(!this.board[x][y].hidden)
                return;
            if(!this.board[x][y].flagged && this.flags == 0)
                return;
            
            this.flags += this.board[x][y].flagged ? 1 : -1;
            this.board[x][y].flagged = !this.board[x][y].flagged;
        },
        floodFill(i, j) {
            if(i < 0 || i >= this.boardSize || j < 0 || j >= this.boardSize)
                return;

            if(!this.board[i][j].hidden || this.board[i][j].flagged)
                return;
            else
                this.board[i][j].hidden = false;

            const adjacentTiles = [
                { x: i-1, y: j-1 }, { x: i-1, y: j }, { x: i-1, y: j+1 }, 
                { x: i, y: j-1 },  { x: i, y: j+1 }, 
                { x: i+1, y: j-1 }, { x: i+1, y: j }, { x: i+1, y: j+1 }
            ];
            const isMine = (i, j) => {
                return this.minePositions.some((item) => item.x == i && item.y == j);
            };

            const hasMineNeighbors = adjacentTiles.some((item) => isMine(item.x, item.y));
            if(hasMineNeighbors)
                return;

            adjacentTiles.forEach(({ x, y }) => {
                this.floodFill(x, y);
            });
        }
    }
};
</script>

<style>
@import "../assets/css/board.css";
</style>