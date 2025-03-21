<script lang="ts">
    let {
        checked = $bindable(false),
        disabled = false,
        label = "",
        accentColor = "#a8c2fa",
        trueColor = "green",
        falseColor = "red",
        size = "md"
    } = $props();

    const sizes = {
        sm: { width: "36px", height: "20px", circle: "16px" },
        md: { width: "44px", height: "24px", circle: "20px" },
        lg: { width: "52px", height: "28px", circle: "24px" }
    };

    let sizeValues = $derived(sizes[size as keyof typeof sizes]);
</script>

<label 
    class="toggle-container"
    style={`
        --toggle-width: ${sizeValues.width};
        --toggle-height: ${sizeValues.height};
        --circle-size: ${sizeValues.circle};
        --accent-color: ${accentColor};
    `}
>
    <input
        type="checkbox"
        bind:checked
        {disabled}
        role="switch"
        aria-checked={checked}
    />
    <span class="track" style={`background-color: ${checked ? trueColor : falseColor};`}>
        <span class="circle" ></span>
    </span>
    {#if label}
        <span class="label">{label}</span>
    {/if}
</label>

<style>
    .toggle-container {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .track {
        position: relative;
        display: inline-block;
        width: var(--toggle-width);
        height: var(--toggle-height);
        background-color: #e5e7eb;
        border-radius: 999px;
        transition: all 0.2s ease;
    }

    .circle {
        position: absolute;
        top: calc((var(--toggle-height) - var(--circle-size)) / 2);
        left: 2px;
        width: var(--circle-size);
        height: var(--circle-size);
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease;
    }

    input:checked + .track {
        background-color: var(--accent-color);
    }

    input:checked + .track .circle {
        transform: translateX(calc(var(--toggle-width) - var(--circle-size) - 4px));
    }

    input:disabled + .track {
        opacity: 0.5;
        cursor: not-allowed;
    }

    input:focus + .track {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }

    .label {
        font-size: 1rem;
        user-select: none;
    }

    /* Hover effect */
    .toggle-container:hover .track:not(:disabled) {
        background-color: #d1d5db;
    }

    .toggle-container:hover input:checked + .track:not(:disabled) {
        background-color: color-mix(in srgb, var(--accent-color) 85%, white);
    }
</style> 