<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal">
            <h2>{{ title }}</h2>
            <p>{{ message }}</p>
            <p>Your time: {{ correctTime }} seconds</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["modalData"],
    data() {
        return {
            title: "",
            message: ""
        };
    },
    computed: {
        correctTime() {
            return this.modalData.seconds + 1;
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        }
    },
    mounted() {
        if(this.modalData.win)
        {
            this.title = "You Win!";
            this.message = "Congratulations! You cleared the game.";
        }
        else
        {
            this.title = "You Lose!";
            this.message = "Better luck next time.";
        }
    }
};
</script>

<style>
@import "../assets/css/modal.css";
</style>