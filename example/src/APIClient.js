const RUNKIT_BASE = 'https://untitled-8rsezqokmxv3.runkit.sh/';

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
  
async function createIntent(amount) {
const formData = new URLSearchParams();
formData.append('amount', amount);

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


export {createIntent, createPosActivationToken};
