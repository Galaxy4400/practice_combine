export const Confirm = ({ text, onClose, onConfirm }) => {
	return (
		<div>
			<h2>{text}</h2>
			<button className="btn" type="button" onClick={onClose}>Отмена</button>
			<button className="btn" type="button" onClick={onConfirm}>Подтвердить</button>
		</div>
	)
};