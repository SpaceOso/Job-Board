import * as React from 'react';

// 'JumboTronProps' describes the shape of props.
export interface JumboTronProps {title: string, subTitle: string}

export const JumboTron = () => {
	return(
		<div className="jumboTron">
			<h1 id="site-title">test</h1>
			<h3 id="site-subtext">test</h3>
		</div>
	)
};