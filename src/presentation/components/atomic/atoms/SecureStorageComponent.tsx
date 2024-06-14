// src/components/SecureStorageComponent.tsx
import React, { useState, useEffect } from 'react';
import { CryptoManager } from '@core/utils/CryptoManager';  // Asegúrate de que la ruta es correcta

const SecureStorageComponent: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [encryptedData, setEncryptedData] = useState<string>('');

  // Inicializa el gestor criptográfico con tu clave secreta
  const cryptoManager = new CryptoManager('tu-clave-secreta');

  useEffect(() => {
    // Intenta recuperar los datos encriptados desde localStorage cuando el componente se monta
    const fetchData = async () => {
      const storedDataHex = localStorage.getItem('encryptedData');
      if (storedDataHex) {
        const decryptedData = await cryptoManager.decrypt(storedDataHex);
        setData(decryptedData);
      }
    };

    fetchData();
  }, [cryptoManager]);

  const handleEncryptAndSave = async () => {
    // Encripta los datos y los guarda en localStorage
    const encryptedDataHex = await cryptoManager.encrypt(data);
    localStorage.setItem('encryptedData', encryptedDataHex);
    setEncryptedData(encryptedDataHex);
  };

  return (
    <div>
      <h1>Secure Local Storage Example</h1>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data to encrypt"
      />
      <button onClick={handleEncryptAndSave}>Encrypt and Save</button>
      {encryptedData && <p>Encrypted Data: {encryptedData}</p>}
    </div>
  );
};

export default SecureStorageComponent;
