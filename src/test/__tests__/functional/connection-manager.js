import React from 'react';
import TestRenderer from 'react-test-renderer';
import { StripeTerminalProvider, injectStripeTerminal } from '../../../index';
import { TestSetup, TestComponent } from '../../helpers/test-setup';

class TestClass extends TestComponent {
    render() {
        let { stripeTerminal } = this.props;
        return (
            <div>
                {stripeTerminal.connection.status}
                {stripeTerminal.connection.reader
                    ? stripeTerminal.connection.reader.label
                    : null}
                {stripeTerminal.error ? stripeTerminal.error.message : null}
            </div>
        );
    }
}

describe('connectReader', () => {
    it('connects to a Reader and updates state', async () => {
        const TestApp = injectStripeTerminal(TestClass);
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
                currency={'USD'}
            >
                <TestApp
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );

        let stripeTerminal;
        const renderer = TestRenderer.create(testElement);
        let readers = await stripeTerminal.discoverReaders({
            method: 'simulated',
        });
        await stripeTerminal.connectReader(readers[0]);
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.disconnectReader();
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
    });
    it('throws exception from onFetchConnectionToken and updates error state', async () => {
        const TestApp = injectStripeTerminal(TestClass);
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={() => {throw new Error('Test Error')}}
                onPaymentIntentRequest={() => {}}
                currency={'USD'}
            >
                <TestApp
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );

        
        const renderer = TestRenderer.create(testElement);
        let readers = await stripeTerminal.discoverReaders({
            method: 'simulated',
        });
        // jsdom exceptions don't get bubbled up correctly to the test code
        // so we can only assert on the error rendered from striepTerminal.error state
        await expect(stripeTerminal.connectReader(readers[0]))
        .rejects.toEqual(new Error('Test Error'))
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.disconnectReader();
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
    });
});
