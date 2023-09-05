<template>
    <div class="difficulty-buttons">
        <button :class="{ selected: isEasy }" @click="changeDifficulty(DIFFICULTY.EASY)">easy</button>
        <button :class="{ selected: isMedium }" @click="changeDifficulty(DIFFICULTY.MEDIUM)">medium</button>
        <button :class="{ selected: isHard }" @click="changeDifficulty(DIFFICULTY.HARD)">hard</button>
    </div>

    <Game :boardSize="boardSize" :mines="mines" />
</template>

<script>
import Game from "./components/Game.vue";

const DIFFICULTY = {
    EASY: [8, 10],
    MEDIUM: [16, 40],
    HARD: [24, 99]
};

export default {
    name: "App",
    components: { Game },
    data() {
        return {
            DIFFICULTY,
            boardSize: DIFFICULTY.MEDIUM[0],
            mines: DIFFICULTY.MEDIUM[1]
        };
    },
    computed: {
        isEasy() {
            return this.boardSize === 8;
        },
        isMedium() {
            return this.boardSize === 16;
        },
        isHard() {
            return this.boardSize === 24;
        },
    },
    methods: {
        changeDifficulty(newDifficulty) {
            [this.boardSize, this.mines] = newDifficulty;
        }
    }
};
</script>

<style>
.difficulty-buttons {
    display: flex;
    justify-content: center;
}

.difficulty-buttons button {
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
    border: 2px solid var(--mine-color);
    background-color: var(--mine-background);
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.difficulty-buttons .selected {
    background-color: var(--mine-color);
}
</style>