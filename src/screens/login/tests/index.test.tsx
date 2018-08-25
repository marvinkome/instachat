import * as React from 'react';
import { create } from 'react-test-renderer';
import Index from '../index';
import View from '../view';
import { flushPromises } from '../../../lib/tests';

describe('Authenitcation screen', () => {
    beforeEach(() => {
        // @ts-ignore
        fetch.resetMocks();
    });

    it('renders homepage correctly <snapshot>', () => {
        const comp = create(<Index />);
        expect(comp).toMatchSnapshot();
    });

    it('toggles views (login and signup)', () => {
        const comp = create(<View />).root;

        // click toggle
        const btn = comp.findByProps({
            'data-testid': 'change-view'
        });

        // simulate click
        btn.props.onPress();

        // find the signUp form
        const signUpForm = comp.findByProps({
            'data-testid': 'signUpForm'
        });

        expect(signUpForm).toBeTruthy();
    });

    it('can login with email and password', async () => {
        // make mock results
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ payload: 'your client id' }));

        // setup test
        const comp = create(<View />).root;

        // find login comp
        const login = comp.findByProps({
            'data-testid': 'loginForm'
        });

        // form
        const emailField = login.findByProps({
            icon: 'user'
        });

        const passwordField = login.findByProps({
            icon: 'lock'
        });

        // submit btn
        const btn = login.findByProps({
            title: 'LOGIN'
        });

        // assert request not made when email and password is empty
        btn.props.onPress();
        await flushPromises();
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(0);

        // fill the form
        emailField.props.onChange('email', 'tester');
        passwordField.props.onChange('password', 'tester');

        // assert state changed
        expect(login.instance.state.email).toEqual('tester');
        expect(login.instance.state.password).toEqual('tester');

        // submit data
        btn.props.onPress();
        await flushPromises();

        // assert that request was made
        // @ts-ignore
        expect(fetch.mock.calls.length).toEqual(1);
    });
});
