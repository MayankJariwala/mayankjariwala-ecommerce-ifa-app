import React from "react";

export function FooterComponent({children}) {

	return (
		<div className="mt-5 text-center">
			{children}
			<p>© 2020 DLiveAuctions</p>
		</div>
	);
}
