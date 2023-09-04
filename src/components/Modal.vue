<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal">
            <p>Win: {{ modalData.win }}</p>
            <p>Time: {{ modalData.seconds }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["modalData"],
    methods: {
        closeModal() {
            this.$emit("close");
        }
    }
};
</script>

<style>
@import "../assets/css/modal.css";
</style>