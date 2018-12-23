import React from 'react';
import TestRenderer from 'react-test-renderer';

import { StripeTerminalProvider, injectStripeTerminal } from '../../../index';
import { TestSetup, TestComponent } from '../../helpers/test-setup';

describe('registerReader', () => {
    it('calls registerReaderHandler with passed options', async () => {
        const TestApp = injectStripeTerminal(TestComponent);
        const registrationOptions = { label: 'testLabel' };
        let onRegisterReaderCalled = false;
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
                onRegisterReader={async options => {
                    expect(options).toBe(registrationOptions);
                    onRegisterReaderCalled = true;
                    return Promise.resolve();
                }}
            >
                <TestApp
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );
        TestRenderer.create(testElement);
        await stripeTerminal.registerReader(registrationOptions);
        expect(onRegisterReaderCalled).toBeTruthy();
    });
});
describe('discoverReaders', () => {
    class ReadersComponent extends TestComponent {
        render() {
            let { stripeTerminal } = this.props;
            return (
                <div>
                    Readers
                    {stripeTerminal.discovery.discoveredReaders.length
                        ? stripeTerminal.discovery.discoveredReaders.map(
                              (reader, index) => (
                                  <div key={index}>
                                      {reader.label}
                                      {reader.ip_address}
                                      {reader.device_type}
                                      {reader.status}
                                      {reader.id}
                                      {reader.serial_number}
                                  </div>
                              )
                          )
                        : null}
                    Discovered{' '}
                    {stripeTerminal.discovery.discoveredReaders.length} Readers
                </div>
            );
        }
    }
    it('discovers available readers and updates discovery.discoveredReaders subhash state', async () => {
        const TestApp = injectStripeTerminal(ReadersComponent);
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
            >
                <TestApp
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );
        const renderer = TestRenderer.create(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.discoverReaders({ method: 'simulated' });
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        renderer.unmount();
    });
    it('starts discoverReaders to find available readers and updates discovery.discoveredReaders subhash state', async () => {
        const TestApp = injectStripeTerminal(ReadersComponent);
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
            >
                <TestApp
                    onFetchConnectionToken={TestSetup.FetchConnectionToken}
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );
        const renderer = TestRenderer.create(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.startDiscovery({ method: 'simulated' });
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.stopDiscovery({ method: 'simulated' });
        renderer.unmount();
    });
});
