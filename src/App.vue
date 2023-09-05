<template>
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
            boardSize: DIFFICULTY.MEDIUM[0],
            mines: DIFFICULTY.MEDIUM[1]
        };
    }
};
</script>

<style>

</style>