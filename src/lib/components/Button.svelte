<script lang="ts" module>
    export type ShadowStyle = 'none' | 'sm' | 'md' | 'lg';
    export type IconPosition = 'none' | 'left' | 'center' | 'right';
</script>

<script lang="ts">
    import type { MouseEventHandler } from 'svelte/elements';
    
    let {
        customStyle = $bindable(''),
        backgroundColor = '#4b5563',
        foregroundColor = '#ffffff',
        borderRadius = 8,
        borderWidth = 1,
        borderColor = '#374151',
        caption = 'Button',
        fontSize = '1rem',
        minWidth = '120px',
        shadowStyle = 'sm' as ShadowStyle,
        disabled = false,
        icon = '',
        iconPosition = 'none' as IconPosition,
        onclick = undefined as unknown as MouseEventHandler<HTMLButtonElement>
    } = $props();
    
    const shadows: Record<ShadowStyle, string> = {
        'none': 'none',
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    };

    function adjustColor(color: string, amount: number): string {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        let r = (num >> 16) + amount;
        let g = ((num >> 8) & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;
        
        r = Math.min(Math.max(0, r), 255);
        g = Math.min(Math.max(0, g), 255);
        b = Math.min(Math.max(0, b), 255);
        
        return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
    }

    let hoverBg = $derived(adjustColor(backgroundColor, -20));
    let hoverFg = $derived(adjustColor(foregroundColor, -20));
</script>
<button
    {onclick}
    {disabled}
    style="
        --bg-color: {backgroundColor};
        --fg-color: {foregroundColor};
        --hover-bg: {foregroundColor};
        --hover-fg: {backgroundColor};
        --border-radius: {borderRadius}px;
        --border-width: {borderWidth}px;
        --border-color: {borderColor};
        --min-width: {iconPosition === 'center' ? 'auto' : minWidth};
        --shadow: {shadows[shadowStyle]};
        --font-size: {fontSize};
        {customStyle}
    "
    data-icon-position={iconPosition}
>
    {#if icon && iconPosition !== 'none' && (iconPosition === 'left' || iconPosition === 'center')}
        <i class="material-icons" style="color: inherit;">{icon}</i>
    {/if}
    {#if iconPosition !== 'center'}
        <span class="caption">{caption}</span>
    {/if}
    {#if icon && iconPosition !== 'none' && iconPosition === 'right'}
        <i class="material-icons" style="color: inherit;">{icon}</i>
    {/if}
</button>

<style>

    button {
        background-color: var(--bg-color);
        color: var(--fg-color);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius);
        min-width: var(--min-width);
        padding: 0.5rem;
        aspect-ratio: 1/1;
        font-size: var(--font-size);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    button:not([data-icon-position="center"]) {
        padding: 0.5rem 1rem;
        aspect-ratio: auto;
    }

    button[data-icon-position="left"] {
        justify-content: flex-start;
    }

    button[data-icon-position="right"] {
        justify-content: flex-end;
    }

    button[data-icon-position="center"] {
        justify-content: center;
    }

    button:hover:not(:disabled) {
        background-color: var(--hover-bg);
        color: var(--hover-fg);
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    button:focus {
        outline: 2px solid var(--border-color);
        outline-offset: 2px;
    }
    button:hover {
        background-color: var(--hover-bg);
        color: var(--hover-fg);
    }
    :global(button i.material-icons) {
        font-size: var(--font-size);
        line-height: 1;
    }

    :global(button span) {
        line-height: 1.25;
    }   
    span.caption {
        padding-block-end: calc(var(--font-size) * 0.15);
    }
</style> 