import * as React from 'react';
import {Job} from "../../../../types/index";
import TinymceComponent from "../../../tinymce/TinymceComponent";
import {Link} from "react-router-dom";
import {RouteComponentProps} from "react-router";

interface myProps extends RouteComponentProps<any>{
	job: Job | null,
}

interface myState{
	description: any
}


class EditJobComponent extends React.Component<myProps, myState> {
	constructor(props){
		super(props);

		this.state = {
			description: ''
		};

		this.handleJobDescriptionChange = this.handleJobDescriptionChange.bind(this);
	}

	componentWillUnmount(){
	}
	
	handleJobDescriptionChange(content){
		this.setState({description: content});
	}
	
	render() {
		return (
			<div>
				<h1>Here you can edit or delete your job posts.</h1>
				<div>
					<div onClick={() => {this.props.history.goBack()}}>Go Back</div>
				</div>
				{<h1>{this.props.job!.title}</h1>}
				{<p>{this.props.job!.description}</p>}
				<TinymceComponent id="job-edit"
				                  onEditorChange={this.handleJobDescriptionChange}
				                  priorContent={this.props.job!.description}
				/>
			</div>
		)
	}
}

export default EditJobComponent;