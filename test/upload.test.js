import React from "react";
import { spy } from 'sinon';
import {expect,should} from 'chai';
import Enzyme from './tests.js';
const {mount,shallow}=Enzyme;
import DropZone from "../src/view/mainPage/upload/dropZone";
import UploadSuccess from "../src/view/mainPage/upload/success/transactionTable";
describe('<DropZone/>', ()=> {
    const wrapper = mount(<DropZone/>);

    it('selector should click()',()=> {
        wrapper.find('#documentType').childAt(1).simulate("change");
        expect(wrapper.state('docType')).to.equals('Bank');
        wrapper.find('#documentType').childAt(2).simulate("change");
        expect(wrapper.state('docType')).to.equals('Settlement');
        wrapper.find('#documentType').childAt(0).simulate("change");
        expect(wrapper.state('docType')).to.equals('');
    });

    it("upload should click()",()=>{
        wrapper.find('.upload-submit').childAt(0).simulate("click");
        expect(wrapper.state('loading')).to.equals('false');
        expect(wrapper.state('status')).to.equals('Please select upload file');
    })
});
