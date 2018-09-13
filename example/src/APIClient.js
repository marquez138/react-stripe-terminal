const RUNKIT_BASE = 'http://localhost:3001/';

async function createPosActivationToken(posDeviceId) {
    const formData = new URLSearchParams();
    formData.append('pos_device_id', posDeviceId);
  
    let res = await fetch(RUNKIT_BASE + 'pos_activation_token', {
      method: 'post',
      body: formData,
    });
    if (!res.ok) {
      throw new Error('Failed to get Activation Token.');
    }
    let json = await res.json();
    return json.activation_token;
  }

async function registerDevice(pairingCode) {
const formData = new URLSearchParams();
formData.append('pairing_code', pairingCode);

let res = await fetch(RUNKIT_BASE + 'pos_register', {
    method: 'post',
    body: formData,
});
if (!res.ok) {
    throw new Error('Failed to get PaymentIntent.');
}
let json = await res.json();
return json.client_secret;
}

async function createIntent(amount, description) {
const formData = new URLSearchParams();
formData.append('amount', amount);
formData.append('description', description);
let res = await fetch(RUNKIT_BASE + 'create_payment_intent', {
    method: 'post',
    body: formData,
});
if (!res.ok) {
    throw new Error('Failed to get PaymentIntent.');
}
let json = await res.json();
return json.client_secret;
}
    


export {createIntent, registerDevice, createPosActivationToken};
