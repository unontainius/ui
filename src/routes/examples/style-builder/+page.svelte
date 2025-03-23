<script lang="ts">
    import StyleBuilder from '$lib/components/StyleBuilder.svelte';

    let styleValue = $state({});

    function handleStyleChange(newValue: any) {
        styleValue = newValue;
    }

</script>

<div class="page-container">
    
    <div class="demo-section">
        <StyleBuilder 
            onChange={handleStyleChange}
        />
    </div>

</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        width: 100dvw;
        max-height: 100dvh;
    }

    .demo-section {
        width: 80%;
        margin:auto;
    }

</style> 