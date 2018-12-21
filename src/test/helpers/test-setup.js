import rp from 'request-promise';
import Fs from 'fs';
import Path from 'path';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

process.on('unhandledRejection', (error, promise) => {
    if (error.message === 'Action canceled.') {
        // silently ignore as this is thrown by the sdk and in the jsdom
        // environment it seems impossible to catch
        return;
    }
    console.log('Unhandled Rejection at:', error.stack || error);
    throw error;
});

/**
 * Loads stored terminal SDK library that contains small fixes to run in test envirpnment
 */
beforeAll(async () => {
    var scriptEl = document.createElement('script');
    window.fetch = fetch;
    const stripeTerminalSdk = await new Promise((resolve, reject) => {
        Fs.readFile(
            Path.join(__dirname, './sdk-b1-test-fixes.js'),
            'utf8',
            (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
    scriptEl.textContent = stripeTerminalSdk;
    document.head.appendChild(scriptEl);
});

class TestSetup {
    static TEST_API_KEY = 'sk_test_HmLHFo4M0h4eEYDVrzAV7axx';
    static CreateTerminal({ options }) {}
    static async FakeAsync() {
        await new Promise(resolve => resolve());
    }
    static async FetchConnectionToken() {
        const response = await rp.post(
            'https://api.stripe.com/v1/terminal/connection_tokens',
            {
                headers: {
                    Authorization: `Bearer ${TestSetup.TEST_API_KEY}`,
                },
            }
        );
        const result = JSON.parse(response);
        return result.secret;
    }
}
class TestComponent extends Component {
    static propTypes = {
        stripeTerminalTestHook: PropTypes.func,
    };
    componentDidMount() {
        if (this.props.stripeTerminalTestHook) {
            this.props.stripeTerminalTestHook(this.props.stripeTerminal);
        }
    }
    render() {
        return <div />;
    }
}

export { TestSetup, TestComponent };
