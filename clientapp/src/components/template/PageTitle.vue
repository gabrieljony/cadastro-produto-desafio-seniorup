<template>
    <div class="title">
        <h1><b-icon v-if="icon" :icon="icon"></b-icon> {{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'title', 'subtitle']
}
</script>

<style>
    .title h1 {
        margin: 0px;
    }

    .title h2 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }
</style>
