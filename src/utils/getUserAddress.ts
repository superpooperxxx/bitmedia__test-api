import * as ethSigUtil from '@metamask/eth-sig-util';

const getUserAddress = (signedMessage: string, message: string) => {
  const recoveredAddress = ethSigUtil.recoverPersonalSignature({
    data: message,
    signature: signedMessage,
  });

  return recoveredAddress;
};

export default getUserAddress;
