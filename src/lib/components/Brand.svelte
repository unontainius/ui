
<script lang="ts" module>
	export const default_imgURL: string = "/favicon.png", default_title: string = "My UI Elements", default_subtitle: string = "Svelte 5 Runes";
</script>

<script lang="ts">
	let {imgURL = default_imgURL, title = default_title, subtitle = default_subtitle, backgroundColor = "#DF4111", color = "#111827"} = $props();
</script>

<div class="brand-text" style="background-color: {backgroundColor}; color: {color};">
    <div class="brand-logo">
        <img src={imgURL} alt="logo" />
    </div>
    <p style="color: {color};">{title}</p>
    <h6 style="color: {color};">{subtitle}</h6>
</div>

<style>
	h6 {

		margin: 0;
		color: #111827;
	}
	p {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
		color: #111827;
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		font-size: 1.25rem;
		font-weight: 600;
		color: #111827;
		height: 200px;
		margin: 0;
		padding-block: 1rem;
		flex-shrink: 0;
        flex-grow: 1;

	}

	.brand-logo {
		width: 100px;
		height: 100px;
		margin-bottom: 10px;
		/* border-radius: 50%; */
	}

	.brand-logo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}
</style>

