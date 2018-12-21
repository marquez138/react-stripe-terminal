import React, { Component } from 'react';
import {
    createPosActivationToken,
    registerDevice,
    createIntent,
} from './APIClient';
import POSApp from './POSApp';
import { StripeTerminalProvider } from 'react-stripe-terminal';

class App extends Component {
    render() {
        return (
            <div
                className="StripePOS"
                style={{
                    margin: 'auto',
                    width: '80%',
                }}
            >
                <h1>React Stripe Terminal Demo</h1>
                <div className="row">
                    <div className="col s5">
                        <StripeTerminalProvider
                            currency="usd"
                            taxRate={0.07}
                            onFetchConnectionToken={createPosActivationToken}
                            onRegisterReader={registerDevice}
                            onPaymentIntentRequest={createIntent}
                        >
                            <POSApp useSimulator={true} />
                        </StripeTerminalProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
