<script lang="ts">
    let {title = '', isOpen = false, children} = $props();
    let isExpanded = $state(isOpen);
</script>

<div class="accordion">
    <button class="accordion-header" onclick={() => isExpanded = !isExpanded}>
        <h3>{title}</h3>
        <span class="icon">{isExpanded ? 'expand_less' : 'expand_more'}</span>
    </button>
    {#if isExpanded}
        <div class="accordion-content">
            {@render children()}
        </div>
    {/if}
</div>

<style>
    .accordion {
        background-color: rgb(58, 58, 58);
        border-radius: 8px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
        overflow: visible;
    }

    .accordion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        padding-block: 0.5rem;
        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .accordion-header:hover {
        background-color: #575757;
    }

    .accordion-header h3 {
        margin: 0;
        font-size: 1.1rem;
        color: #25befa;
    }

    .icon {
        font-family: 'Material Icons';
        font-size: 1.5rem;
        color: #e2e0e0;
    }

    .accordion-content {
        padding: 1rem;
        padding-block: 0.5rem;
        background-color: #535353;
        overflow: visible;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style> 