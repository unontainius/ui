<script lang="ts">
	import Button from "$lib/components/Button.svelte";
    import StyleBuilder from "$lib/components/StyleBuilder.svelte";
	import Window from "$lib/components/Window.svelte";
    let isOpen = $state(false);
    let customStyle = $state('')

    function handleStyleBuilderOnChange(style: string) {
        customStyle = style;
    }
</script>


<div class="page-container">
    <Button bind:customStyle = {customStyle} caption="Open Style Builder" onclick={() => (isOpen = true)} />
    {customStyle}
</div>

{#if isOpen}
    <Window bind:show={isOpen} title="Style Builder" width="lg" position="center" showFooter={false}>
        <StyleBuilder onChange={(e:string) => {
            handleStyleBuilderOnChange(e);
            isOpen = false;
        }}/>
    </Window>
{/if}

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        color: rgb(51, 51, 51);
    }
</style>