import React from "react";
import { spy } from 'sinon';
import {expect,should} from 'chai';
import Enzyme from './tests.js';
const {mount,shallow}=Enzyme;
import Detail from "../src/view/mainPage/detail/detail";
import TransactionTable from "../src/view/mainPage/detail/transactionTable";

describe('<Detail/>', ()=> {
    const props = {
        match:{
            params:{
                id:"123",
            }
        }
    };
    const wrapper = shallow(<Detail {...props}/>);
    it('url params should read',()=> {
        expect(wrapper.state('id')).to.equals("123");
        expect(wrapper.state('title')).to.equals("Reconcile Results " + "123");
    });
});

describe('<TransactionTable/>', ()=> {
    const props = {
        id:"Apr-2018",
    };
    const wrapper = shallow(<TransactionTable/>);

    it('reconcile button should click()',()=> {
        wrapper.setState({ loading: 'false' });
        expect(wrapper.state('loading')).to.equals('false');
        wrapper.find('.transaction-btn-group').childAt(0).simulate('click');
        expect(wrapper.state('loading')).to.equals('true');
    });

    it('not reconcile button click()',()=> {
        wrapper.setState({ loading: 'false' });
        expect(wrapper.state('loading')).to.equals('false');
        wrapper.find('.transaction-btn-group').childAt(0).simulate('click');
        expect(wrapper.state('loading')).to.equals('true');
    });


});