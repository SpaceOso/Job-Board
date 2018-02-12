/**
 * Created by Rico on 7/8/2017.
 */
import * as React from 'react';
/*This will be the item that makes up the list of editable job items in the dashboard.
* This will have options to edit jobs such as..
* modify title, description and keywords.
* Delete the job itself.
* Should this send you to a different window? or should everything be handled through this item?*/
class EditJobListItem extends React.Component{
    render(){
        return(
            <div>
                <h1>I'm a edit job list item component</h1>
            </div>
        )
    }
}

export default EditJobListItem;