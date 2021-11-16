import AWS from '../configs/aws.config';

const KMS = new AWS.KMS();

export async function encryptKeyWallet(
  rawPrivateKey: string,
): Promise<AWS.KMS.Types.EncryptResponse> {
  const KeyId = process.env.AWS_ENCRYPTION_KEY_ID;
  const EncryptionAlgorithm = 'RSAES_OAEP_SHA_256';
  return await KMS.encrypt({
    KeyId,
    EncryptionAlgorithm,
    Plaintext: rawPrivateKey,
  }).promise();
}

export async function decryptKeyWallet(encryptedData: string) {
  const KeyId = process.env.AWS_ENCRYPTION_KEY_ID;
  const decryptedData = await KMS.decrypt({
    EncryptionAlgorithm: 'RSAES_OAEP_SHA_256',
    KeyId,
    CiphertextBlob: Buffer.from(encryptedData, 'hex'),
  }).promise();
  return decryptedData.Plaintext.toString();
}
