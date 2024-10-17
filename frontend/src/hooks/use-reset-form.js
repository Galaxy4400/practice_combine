import { useSelector } from "react-redux";
import { selecthash } from "../selectors/select-user-session";
import { useEffect } from "react";

export const useResetForm = (reset) => {
	const session = useSelector(selecthash);

	useEffect(() => {
		if (!session) reset();
	}, [session, reset]);
};