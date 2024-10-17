import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { Modal } from './modal';


const ModalContext = createContext(null);


export const ModalProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [content, setContent] = useState(null);

	const openModal = (content) => {
		setContent(content);
		setIsOpen(true);
	};

	const closeModal = () => setIsOpen(false);

	return (
		<ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
			{children}
			<Modal>{content}</Modal>
		</ModalContext.Provider>
	)
};


export const useModal = () => useContext(ModalContext);
