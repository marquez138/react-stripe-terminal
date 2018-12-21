import React, { Component } from 'react';
import TestRenderer from 'react-test-renderer';
import UUID from 'pure-uuid';
import { TestSetup, TestComponent } from '../../helpers/test-setup';
import { StripeTerminalProvider, injectStripeTerminal } from '../../../index';

class LineItemComponent extends TestComponent {
    render() {
        const { stripeTerminal } = this.props;

        return (
            <div>
                <p>Basket Items</p>
                <p>Subtotal: {stripeTerminal.payment.subtotal}</p>
                <p>Tax: {stripeTerminal.payment.tax}</p>
                <p>
                    Balance Due:
                    {stripeTerminal.payment.balanceDue}
                </p>
                {stripeTerminal.payment.lineItems.map((item, index) => (
                    <div
                        id={
                            item.id !== undefined
                                ? 'id-rendered'
                                : 'id-not-rendered'
                        }
                        key={index}
                    >
                        <p>amount: {item.amount}</p>
                        <p>quantity: {item.quantity}</p>
                        <p>description: {item.description}</p>
                    </div>
                ))}
            </div>
        );
    }
}
describe('lineItems', () => {
    it('adds line items to display and computes total and tax', async () => {
        const TestApp = injectStripeTerminal(LineItemComponent);
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
                currency={'USD'}
                taxRate={0.07}
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
        await stripeTerminal.connectReader(readers[0]);
        for (let i = 0; i < 3; i += 1) {
            await stripeTerminal.addLineItem({
                id: new UUID(4).toString(),
                description: 'Silver Hat',
                amount: 2000,
                quantity: 2,
            });
        }
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.disconnectReader();
        renderer.unmount();
    });
    describe('removeLineItems', () => {
        it('removes items from display and state computes total and tax', async () => {
            const TestApp = injectStripeTerminal(LineItemComponent);
            let stripeTerminal;
            const testElement = (
                <StripeTerminalProvider
                    onFetchConnectionToken={TestSetup.FetchConnectionToken}
                    onPaymentIntentRequest={() => {}}
                    currency={'USD'}
                    taxRate={0.07}
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
            await stripeTerminal.connectReader(readers[0]);
            let items = [];
            for (let i = 0; i < 3; i += 1) {
                let item = {
                    id: new UUID(4).toString(),
                    description: 'Silver Hat',
                    amount: 2000,
                    quantity: 1,
                };
                await stripeTerminal.addLineItem(item);
                items.push(item);
            }
            renderer.update(testElement);
            expect(renderer.toJSON()).toMatchSnapshot();
            for (let i = 0; i < items.length; i += 1) {
                await stripeTerminal.removeLineItem(items[i]);
                renderer.update(testElement);
                expect(renderer.toJSON()).toMatchSnapshot();
            }
            await stripeTerminal.disconnectReader();
            renderer.unmount();
        });
        it('decrements quantity from display and state computes total and tax', async () => {
            const TestApp = injectStripeTerminal(LineItemComponent);
            let stripeTerminal;
            const testElement = (
                <StripeTerminalProvider
                    onFetchConnectionToken={TestSetup.FetchConnectionToken}
                    onPaymentIntentRequest={() => {}}
                    currency={'USD'}
                    taxRate={0.07}
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
            await stripeTerminal.connectReader(readers[0]);
            let items = [];
            for (let i = 0; i < 3; i += 1) {
                let item = {
                    id: new UUID(4).toString(),
                    description: 'Silver Hat',
                    amount: 2000,
                    quantity: 2,
                };
                await stripeTerminal.addLineItem(item);
                items.push(item);
            }
            renderer.update(testElement);
            expect(renderer.toJSON()).toMatchSnapshot();
            for (let i = 0; i < items.length; i += 1) {
                await stripeTerminal.removeLineItem(items[i]);
                renderer.update(testElement);
                expect(renderer.toJSON()).toMatchSnapshot();
            }
            await stripeTerminal.disconnectReader();
            renderer.unmount();
        });
    });
    it('computes custom total and tax for line items', async () => {
        const TestApp = injectStripeTerminal(LineItemComponent);
        let stripeTerminal;
        // test verification handler for custom subtotal and tax compute
        const verifySubtotalTaxHandler = items => {
            expect(items.length).toBeGreaterThan(0);
            items.forEach(item => {
                expect(item.amount).toBeGreaterThan(0);
                expect(typeof item.id).toBe('string');
                expect(item.quantity).toBeGreaterThan(0);
            });
            return 5;
        };
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
                currency={'USD'}
                taxRate={0.07}
                computeSubtotal={verifySubtotalTaxHandler}
                computeTaxAmount={verifySubtotalTaxHandler}
            >
                <TestApp
                    stripeTerminalTestHook={t => {
                        stripeTerminal = t;
                    }}
                />
            </StripeTerminalProvider>
        );
        const renderer = TestRenderer.create(testElement);
        const readers = await stripeTerminal.discoverReaders({
            method: 'simulated',
        });
        await stripeTerminal.connectReader(readers[0]);
        for (let i = 0; i < 3; i += 1) {
            await stripeTerminal.addLineItem({
                id: new UUID(4).toString(),
                description: 'Silver Hat',
                amount: 2000,
                quantity: 2,
            });
        }
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.clearPayment();
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.disconnectReader();
        renderer.unmount();
    });
    it('clears payment state and reader screen', async () => {
        const TestApp = injectStripeTerminal(LineItemComponent);
        let stripeTerminal;
        const testElement = (
            <StripeTerminalProvider
                onFetchConnectionToken={TestSetup.FetchConnectionToken}
                onPaymentIntentRequest={() => {}}
                currency={'USD'}
                taxRate={0.07}
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
        await stripeTerminal.connectReader(readers[0]);
        for (let i = 0; i < 3; i += 1) {
            await stripeTerminal.addLineItem({
                id: new UUID(4).toString(),
                description: 'Silver Hat',
                amount: 2000,
                quantity: 2,
            });
        }
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.clearPayment();
        renderer.update(testElement);
        expect(renderer.toJSON()).toMatchSnapshot();
        await stripeTerminal.disconnectReader();
        renderer.unmount();
    });
});
