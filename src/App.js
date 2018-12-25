import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import map from 'lodash/map';
import findIndex from 'lodash/findIndex';
import Slider from 'react-slick';
import config from './config';

class App extends Component {

  state = {
    isOpen: false,
    sliderRef: null,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLinkClick = (link) => {
    const index = findIndex(config, item => item.link === link);
    this.state.sliderRef.slickGoTo(index);
  };

  render() {
    const { location: { pathname }, history } = this.props;
    const { isOpen } = this.state;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      initialSlide: findIndex(config, item => item.link === pathname),
      afterChange: (index) => { history.push(config[index].link); },
    };

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {map(config, item => (
                <NavItem key={`link-${item.link}`}>
                  <NavLink
                    onClick={() => this.onLinkClick(item.link)}
                    className={'nav-link'}
                    to={item.link}
                  >
                    {item.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
        <div className={'slider-container'}>
          <Slider {...settings} ref={o => { this.state.sliderRef = o; }}>
            {map(config, item => (
              <Fragment key={`element-${item.name}`}>
                {item.element}
              </Fragment>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
