import React from "react";
import { spy } from 'sinon';
import {expect} from 'chai';
import Enzyme from './tests.js';
const {mount,shallow}=Enzyme;
import Login from "../src/view/login";

describe('<Login/>', ()=> {
    const wrapper = mount(<Login/>);
    it('should has three inputs',()=> {
        // wrapper.setState({ email: 'hello@ifelse.io' });
        expect(wrapper.find('input').length).to.equal(3);
    });

    it('submit button should exist',()=> {
        expect(wrapper.find('.submit-btn').length).to.equals(1);
    });

    it('username field should onChange()',()=>{
        const event = {target: {value: "test@test.com"}};
        wrapper.find('input').at(0).simulate('change',event);
        expect(wrapper.state().email).to.equals("test@test.com");
    });

    it('password field should onChange()',()=>{
        const event = {target: {value: "12345678"}};
        wrapper.find('input').at(1).simulate('change',event);
        expect(wrapper.state().password).to.equals("12345678");
    });

    it('submit should onClick()',()=>{
        const userEvent = {target: {value: "test@test.com"}};
        const pwdEvent = {target: {value: "12345678"}};
        wrapper.find('input').at(0).simulate('change',userEvent);
        wrapper.find('input').at(1).simulate('change',pwdEvent);
        wrapper.find('.submit-btn').at(0).simulate('click',{ preventDefault() {} });
        expect(wrapper.state().loading).to.equals('true');
    });
});