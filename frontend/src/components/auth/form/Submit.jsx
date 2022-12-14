import React from "react";
import { ImSpinner2 } from "react-icons/im";


export default function Submit(props) {
	return (
		<button
			type="submit"
			className="w-full bg-primary text-white rounded hover:bg-gray-800 transition font-semibold text-lg mt-1 h-10 flex items-center justify-center outline-primary"
		>
			{props.busy ? <ImSpinner2 className="animate-spin" /> : props.value}
		</button>
	);
}

