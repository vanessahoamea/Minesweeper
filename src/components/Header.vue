<template>
    <div class="header">
        <div class="flags">{{ flags }}</div>
        <div class="icon">
            <img :src="gameIcon" alt="Game icon" draggable="false">
        </div>
        <div class="timer">{{ formattedTime }}</div>
    </div>
</template>

<script>
export default {
    props: ["flags", "icon", "seconds"],
    computed: {
        gameIcon() {
            return require("../assets/icons/" + this.icon + ".svg");
        },
        formattedTime() {
            return ("000" + this.seconds).substr(-3);
        }
    }
};
</script>