/**
 * Clase CryptoManager
 * Encargada de encriptar y desencriptar datos utilizando la Web Crypto API.
 * @param secretKey Clave secreta usada para la encriptación y desencriptación
 * @example
 * // Ejemplo de uso:
 * const cryptoManager = new CryptoManager("mi-clave-secreta");
 * const data = "Hola, mundo!";
 * const encryptedData = await cryptoManager.encrypt(data);
 * const decryptedData = await cryptoManager.decrypt(encryptedData);
 * console.log(decryptedData); // "Hola, mundo!"
 */
export class CryptoManager {
    private keyPromise: Promise<CryptoKey>;
  
    constructor(private secretKey: string) {
      this.keyPromise = this.generateKey();
    }
  
    /**
     * Genera una clave criptográfica a partir de la clave secreta proporcionada
     * @returns Promise que resuelve a una CryptoKey
     */
    private async generateKey(): Promise<CryptoKey> {
      const encoder = new TextEncoder();
      return window.crypto.subtle.importKey(
        "raw",
        encoder.encode(this.secretKey),
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
      );
    }
  
    /**
     * Encripta datos
     * @param data Datos en formato string que se desea encriptar
     * @returns Promise que resuelve a los datos encriptados en formato hexadecimal
     */
    public async encrypt(data: string): Promise<string> {
      const key = await this.keyPromise;
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const enc = new TextEncoder();
      const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        enc.encode(data)
      );
      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
      const dataHex = Array.from(new Uint8Array(encryptedData)).map(b => b.toString(16).padStart(2, '0')).join('');
      return ivHex + dataHex;
    }
  
    /**
     * Desencripta datos encriptados
     * @param dataHex Datos encriptados en formato hexadecimal que se desea desencriptar
     * @returns Promise que resuelve a los datos desencriptados en formato string
     */
    public async decrypt(dataHex: string): Promise<string> {
      const key = await this.keyPromise;
      const iv = new Uint8Array(dataHex.slice(0, 24).match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
      const data = new Uint8Array(dataHex.slice(24).match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        data
      );
      const dec = new TextDecoder();
      return dec.decode(decryptedData);
    }
  }
  