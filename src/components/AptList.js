import React, { Component } from 'react';
 
class AptList extends Component {
    constructor(props) {
        super(props);

    }

    handleDelete() {
       this.props.onDelete(this.props.whichItem);
    }

    render() {
        return(
            <div className="container">
                <li>
                    <div className="media-left">
                        <button onClick={this.handleDelete.bind(this)}>
                            Remove
                        </button>
                    </div>
                    <div>
                        <span>{this.props.singleItem.petName}</span>
                        <span>{this.props.singleItem.aptDate}</span>
                    </div>
                    <div>
                        <span>{this.props.singleItem.ownerName}</span>
                    </div>
                    <div>
                    <span>{this.props.singleItem.aptNotes}</span>
                    </div>
                </li>
            </div>
        )
    }
}

export default AptList;
