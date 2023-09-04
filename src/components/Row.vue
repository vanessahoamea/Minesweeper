<template>
    <div v-for="(tile, j) in row" :key="j" :class="{ 
        tile: true, 
        empty: !tile.hidden && tile.value == 0, 
        number: !tile.hidden && tile.value > 0, 
        mine: !tile.hidden && tile.isMine 
    }" @click.left="handleLeftClick(tile)" @click.right="handleRightClick($event, tile)">
        <!-- opened tile -->
        <div v-if="!tile.hidden">
            <font-awesome-icon v-if="tile.isMine" :icon="['fas', 'bomb']" />
            <span v-if="tile.value > 0">{{ tile.value }}</span>
        </div>
        <!-- flagged tile -->
        <div v-if="tile.hidden && tile.flagged">
            <font-awesome-icon :icon="['fas', 'flag']" class="flagged" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["row"],
    emits: ["selected", "flagged"],
    methods: {
        handleLeftClick(tile) {
            this.$emit("selected", tile.x, tile.y);
        },
        handleRightClick(e, tile) {
            e.preventDefault();
            this.$emit("flagged", tile.x, tile.y);
        }
    }
};
</script>