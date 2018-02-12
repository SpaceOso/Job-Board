import * as React from 'react';
import {Job} from "../../../../types/index";

type Props = {
	job : Job,
	handleJobEdit: () =>void,
	handleJobDelete: ()=>void
}

const JobAtGlanceComponent: React.SFC<Props> = (props) => {
	const{children, ...restProps} = props;

	return(
		<div>
			I'm the job at glance Component
			<h1>{props.job.title}</h1>
			<h3>{props.job.description}</h3>
			<div className="job-links" >
				<ul>
					<li onClick={props.handleJobDelete}>Delete</li>
					<li onClick={props.handleJobEdit}>Edit</li>
				</ul>
			</div>
		</div>
	)
};

export default JobAtGlanceComponent;