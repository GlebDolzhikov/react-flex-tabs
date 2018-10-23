export function getTextWidth(text, font = '12px Open Sans') {
	const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
	const context = canvas.getContext('2d');
	if (context) {
		context.font = font;
		const metrics = context.measureText(text);
		return metrics.width;
	}
	return 0;
}