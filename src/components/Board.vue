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
                if(this.seconds === 998 || this.gameOver)
                    clearInterval(timer);
                this.seconds += 1;
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
                return; // TODO
        },
        flagTile(x, y) {
            this.playing = true;
            
            if(!this.board[x][y].hidden)
                return;
            if(!this.board[x][y].flagged && this.flags == 0)
                return;
            
            this.flags += this.board[x][y].flagged ? 1 : -1;
            this.board[x][y].flagged = !this.board[x][y].flagged;
        }
    }
};
</script>

<style>
@import "../assets/css/board.css";
</style>