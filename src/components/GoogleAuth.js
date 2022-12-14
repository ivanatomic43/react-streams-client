import React from 'react';
import { connect } from "react-redux";
import {signIn, signOut} from '../actions';
 

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '694597548955-dfum8q3b0epm8810q90f5eopst37b9fc.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streamy"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => { //isSignedIn from google auth instance
       if (isSignedIn) {
        this.props.signIn(this.auth.currentUser.get().getId()); //calling action creators
       } else {
        this.props.signOut();
       }
    };
 
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className='ui red google button' >
                    <i className='google icon' ></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className='ui red google button' >
                    <i className='google icon' ></i>
                    Sign In with Google 
                </button>
            );
        }
    }
    render (){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn } //.auth is key in reducers/index.js, isSignedIn is props object in this component
};

export default connect(mapStateToProps, 
{signIn, signOut})
(GoogleAuth);