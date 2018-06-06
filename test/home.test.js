import React from "react";
import { spy } from 'sinon';
import {expect,should} from 'chai';
import Enzyme from './tests.js';
const {mount,shallow}=Enzyme;
import Home from "../src/view/mainPage/home/home";
import Title from "../src/view/components/content/title";
import Header from "../src/view/components/content/header";

describe('<Home/>', ()=> {
    const wrapper = shallow(<Home/>);

    it('title should exist',()=> {
        expect(wrapper.state('title')).to.not.be.undefined;
        wrapper.setState({title:"newTitle"});
        expect(wrapper.state('title')).to.equals("newTitle");
    });

    it('title component should read props',()=> {
        const props = {
            title: "titles"
        };
        const titleWrapper = shallow(<Title {...props}/>);
        expect(titleWrapper.find('p').text()).to.equals("titles");
    });

});

describe('<Header/>', ()=> {
    it('header component should read props',()=> {
        const props = {
            clickedClass: "Dashboard"
        };
        const headerWrapper = shallow(<Header {...props}/>);
        expect(headerWrapper.state().clicked).to.equals("Dashboard");
    });

    it('header component should display title',()=> {
        const props = {
            clickedClass: "Dashboard"
        };
        const headerWrapper = shallow(<Header {...props}/>);
        const headerLen = headerWrapper.state().items.length;
        const liLen = headerWrapper.find("li").length;
        expect(headerLen).to.equals(liLen);
    });
});

