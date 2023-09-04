<template>
    <div class="board">
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
    props: ["boardSize", "mines", "minePositions", "createBoard"],
    components: { Row, Header },
    data() {
        return {
            flags: this.mines,
            icon: "smiling",
            seconds: 0,
            board: this.createBoard(this.boardSize, this.minePositions)
        };
    },
    methods: {
        openTile(x, y) {
            // only tiles that are not flagged can be opened
            if(!this.board[x][y].flagged)
                this.board[x][y].hidden = false;

            // game ends when clicking on a mine
            if(this.board[x][y].isMine)
                return; // TODO

            // open more tiles after cliking on one not surrounded by mines
            if(this.board[x][y].value === 0)
                return; // TODO
        },
        flagTile(x, y) {
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