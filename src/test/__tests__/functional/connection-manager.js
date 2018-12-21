import React from 'react';
import TestRenderer from 'react-test-renderer';
import { StripeTerminalProvider, injectStripeTerminal } from '../../../index';
import { TestSetup, TestComponent } from '../../helpers/test-setup';

describe('connectReader', () => {
    it('connects to a Reader and updates state', async () => {
        class TestClass extends TestComponent {
            render() {
                let { stripeTerminal } = this.props;
                return (
                    <div>
                        {stripeTerminal.connection.status}
                        {stripeTerminal.connection.reader
                            ? stripeTerminal.connection.reader.label
                            : null}
                    </div>
                );
            }
        }
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
});
