import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MaterialPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materialList:[
                    {name:'材料一',image:''},
                ]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='contains'>
                <div className='header'>
                    扫码选材
                </div>
                <div className='middle'>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

MaterialPage.propTypes = {};

export default MaterialPage;
