import css from './modal.module.scss';
import { useModal } from "./modal-provider";

export const Modal = ({ children }) => {
	const { isOpen, closeModal } = useModal();

	const outsideClickHandler = ({ target }) => {
		if (target.classList.contains(css.modal)) {
			closeModal();
		}
	};

	return (
		<div className={`${css.modal} ${isOpen ? 'active' : ''}`} onMouseDown={outsideClickHandler}>
			<div className={css.container}>
				<button className={css.close} onClick={() => closeModal()}>Close</button>
				{children}
			</div>
		</div>
	);
};