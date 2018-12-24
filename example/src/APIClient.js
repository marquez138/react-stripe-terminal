const API_BASE = 'https://api.stripe.com/';
const TEST_API_KEY = 'sk_test_HmLHFo4M0h4eEYDVrzAV7axx';

/**
 * NOTE: For the purposes of the example we are running these privledged API
 * requests from the client. In a real-world deployment you MUST make these
 * reqeuests from your backend.
 * @param {String} posDeviceId
 */
async function createPosActivationToken() {
    const res = await fetch(`${API_BASE}/v1/terminal/connection_tokens`, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${TEST_API_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to get Activation Token.');
    }
    const connection_token = await res.json();
    return connection_token.secret;
}

async function registerDevice(pairingCode) {
    const formData = new URLSearchParams();
    formData.append('registration_code', pairingCode);

    const res = await fetch(`${API_BASE}/v1/terminal/readers`, {
        method: 'post',
        body: formData,
        headers: {
            Authorization: `Bearer ${TEST_API_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to register reder.');
    }
    let json = await res.json();
    return json;
}

async function createIntent({ amount, description, currency = 'usd' }) {
    const formData = new URLSearchParams();
    formData.append('amount', amount);
    formData.append('description', description);
    formData.append('currency', currency);
    formData.append('allowed_source_types[]', 'card_present');
    formData.append('capture_method', 'manual');
    let res = await fetch(`${API_BASE}/v1/payment_intents`, {
        method: 'post',
        body: formData,
        headers: {
            Authorization: `Bearer ${TEST_API_KEY}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to get PaymentIntent.');
    }
    let json = await res.json();
    return json.client_secret;
}

export { createIntent, registerDevice, createPosActivationToken };
