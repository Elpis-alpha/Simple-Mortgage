export const Text = <div className="form-pack">
	<label htmlFor="ap1aa-title">Title</label>
	<input type="text" id="ap1aa-title" name="ap1aa-title" />
</div>

export const Texxt = <div className="form-pack">
	<label htmlFor="ap1aa-title">Title</label>
	<textarea id="ap1aa-title" name="ap1aa-title"></textarea>
</div>

export const Checkbox = <div className="form-pack">
	<label>What do you want</label>
	<div className="checkbox">
		<input type="checkbox" id="my-checkbox" name="my-checkbox" />
		<label htmlFor="my-checkbox">Chicken</label>
	</div>
	<div className="checkbox">
		<input type="checkbox" id="my-checkboxxx" name="my-checkboxxx" />
		<label htmlFor="my-checkboxxx">Turkey</label>
	</div>
</div>

export const Radio = <div className="form-pack">
	<label>What do you want (choose one)</label>
	<div className="radio">
		<input type="radio" id="radio-option-1" name="radio-group" />
		<label htmlFor="radio-option-1">Radio Option 1</label>
	</div>
	<div className="radio">
		<input type="radio" id="radio-option-2" name="radio-group" />
		<label htmlFor="radio-option-2">Radio Option 2</label>
	</div>

</div>
