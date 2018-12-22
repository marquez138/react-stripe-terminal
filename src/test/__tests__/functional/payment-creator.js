import React from 'react';
import rp from 'request-promise';
import { TestSetup, TestComponent } from '../../helpers/test-setup';
import { StripeTerminalProvider, injectStripeTerminal } from '../../../index';
import TestRenderer from 'react-test-renderer';

const createPaymentIntent = async ({ amount, currency = 'usd' }) => {
    const response = await rp.post(
        `https://api.stripe.com/v1/payment_intents?amount=${amount}&currency=${currency}&allowed_source_types[]=card_present&capture_method=manual`,
        {
            headers: {
                Authorization: `Bearer ${TestSetup.TEST_API_KEY}`,
            },
        }
    );

    const result = JSON.parse(response);
    return result.client_secret;
};

class PaymentComponent extends TestComponent {
    componentDidUpdate() {
        this.props.onVerifyState(this.props.stripeTerminal);
    }
    render() {
        const { stripeTerminal } = this.props;
        return <div>Payment Status: {stripeTerminal.payment.status}</div>;
    }
}
describe('payment-creator', () => {
    /**
     * Creating payments takes a little longer so test timeouts here are 10s
     */
    describe('createPayment', () => {
        it('creates a payment', async () => {
            const TestApp = injectStripeTerminal(PaymentComponent);
            let stripeTerminal, piHandlerCalled;
            let renderer, lastPaymentState;
            const testElement = (
                <StripeTerminalProvider
                    onFetchConnectionToken={TestSetup.FetchConnectionToken}
                    onPaymentIntentRequest={async options => {
                        piHandlerCalled = true;
                        const pi = await createPaymentIntent({ ...options });
                        return pi;
                    }}
                    currency={'USD'}
                    taxRate={0.07}
                >
                    <TestApp
                        onVerifyState={stripeTerminal => {
                            if (!renderer) {
                                return;
                            }
                            if (
                                stripeTerminal.payment.status !==
                                lastPaymentState
                            ) {
                                lastPaymentState =
                                    stripeTerminal.payment.status;
                                expect(renderer.toJSON()).toMatchSnapshot();
                            }
                        }}
                        stripeTerminalTestHook={t => {
                            stripeTerminal = t;
                        }}
                    />
                </StripeTerminalProvider>
            );
            renderer = TestRenderer.create(testElement);
            expect(renderer.toJSON()).toMatchSnapshot();

            const readers = await stripeTerminal.discoverReaders({
                method: 'simulated',
            });
            let conn = await stripeTerminal.connectReader(readers[0]);

            let pi = await stripeTerminal.createPayment({
                paymentIntentOptions: {
                    amount: 100,
                    currency: 'usd',
                },
            });
            renderer.update(testElement);
            expect(piHandlerCalled).toBe(true);
            expect(typeof pi).toBe('object');
            await stripeTerminal.disconnectReader();
        }, 10000);
    });

    describe('cancelCreatePayment', () => {
        it('cancels an in-flight payment', async () => {
            const TestApp = injectStripeTerminal(PaymentComponent);
            let stripeTerminal, piHandlerCalled;
            let renderer, lastPaymentState, cancelled;
            const testElement = (
                <StripeTerminalProvider
                    onFetchConnectionToken={TestSetup.FetchConnectionToken}
                    onPaymentIntentRequest={async options => {
                        piHandlerCalled = true;
                        const pi = await createPaymentIntent({ ...options });
                        return pi;
                    }}
                    currency={'USD'}
                    taxRate={0.07}
                >
                    <TestApp
                        onVerifyState={async stripeTerminal => {
                            if (!renderer) {
                                return;
                            }
                            if (
                                lastPaymentState !==
                                stripeTerminal.payment.status
                            ) {
                                expect(renderer.toJSON()).toMatchSnapshot();
                                lastPaymentState =
                                    stripeTerminal.payment.status;
                            }

                            if (
                                stripeTerminal.payment.status ===
                                    'collecting_payment_method' &&
                                !cancelled
                            ) {
                                cancelled = true;
                                try {
                                    await stripeTerminal.cancelCreatePayment();
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        }}
                        stripeTerminalTestHook={t => {
                            stripeTerminal = t;
                        }}
                    />
                </StripeTerminalProvider>
            );
            renderer = TestRenderer.create(testElement);
            expect(renderer.toJSON()).toMatchSnapshot();

            const readers = await stripeTerminal.discoverReaders({
                method: 'simulated',
            });
            await stripeTerminal.connectReader(readers[0]);

            await stripeTerminal.createPayment({
                paymentIntentOptions: {
                    amount: 100,
                    currency: 'usd',
                },
            });

            expect(piHandlerCalled).toBe(true);
            renderer.update(testElement);
            expect(renderer.toJSON()).toMatchSnapshot();
            await stripeTerminal.disconnectReader();
        }, 10000);
    });
});
