import React from "react";
import {NavigationComponent} from "src/components/common/NavigationComponent";

/**
 *  Dashboard Index Component
 * @return {*}
 * @author Mayank Jariwala
 */
export function IndexPage() {

	React.useEffect(() => {

		return () => {

		};
	}, []);


	return (
		<React.Fragment>
			<NavigationComponent/>
			<div className="main-content">
				<div className="page-content">
				</div>
			</div>
		</React.Fragment>
	);
}
