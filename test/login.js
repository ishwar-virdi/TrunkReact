import React from "react";
import {mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import {expect} from 'chai';
import Login from "../src/view/login";

spy(Login.prototype, 'componentDidMount');

describe('<Login/>', ()=> {
    it('StringBuffer is String and work',()=> {
        const wrapper = shallow(<Login/>);
        // wrapper.setState({ email: 'hello@ifelse.io' });
        console.log(wrapper.find('button'));
        // wrapper.find('button').simulate('click');
        // console.log(wrapper.state());
        expect("a").to.equal("a");
    });
});