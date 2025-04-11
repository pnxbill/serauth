/* global chrome */
import React, { useState, useEffect } from 'react';
import CPFList from './components/CPFList';
import CPFDetails from './components/CPFDetails';
import CPFActions from './components/CPFActions';
import { DEFAULT_PASSWORD, DOMAIN } from './constants';
import './index.css';

const App = () => {
  const [cpfs, setCpfs] = useState([]);
  const [selectedCPF, setSelectedCPF] = useState(null);

  // Load CPFs from chrome.storage when the component mounts.
  useEffect(() => {
    chrome.storage.local.get('cpfs', (data) => {
      setCpfs(data.cpfs || []);
    });
  }, []);

  // Helper to update storage and state.
  const updateStorage = (newCpfs) => {
    chrome.storage.local.set({ cpfs: newCpfs }, () => {
      setCpfs(newCpfs);
    });
  };

  // Create a new CPF and add it to the list.
  const createCPF = () => {
    const newCpf = { id: 'CPF-' + Date.now(), password: DEFAULT_PASSWORD };
    updateStorage([...cpfs, newCpf]);
  };

  // Update the password for a given CPF.
  const updatePassword = (id, newPassword) => {
    const updated = cpfs.map((cpf) =>
      cpf.id === id ? { ...cpf, password: newPassword } : cpf
    );
    updateStorage(updated);
    if (selectedCPF && selectedCPF.id === id) {
      setSelectedCPF({ ...selectedCPF, password: newPassword });
    }
  };

  // Delete a CPF from the list.
  const deleteCPF = (id) => {
    const updated = cpfs.filter((cpf) => cpf.id !== id);
    updateStorage(updated);
    setSelectedCPF(null);
  };

  // Sample function to call an API.
  const callApi = () => {
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => console.log('API Response:', data))
      .catch((error) => console.error('API call error:', error));
  };

  // Redirect the user to a new URL.
  const redirectUser = (url) => {
    document.cookie = "Bifrost-AU=test; path=/";
    window.location.href = DOMAIN + '/area-cliente'
  };

  return (
    <div id="cpf-manager-container">
      {/* Left Panel: CPF List and Details */}
      <div id="cpf-left-panel">
        <CPFList
          cpfs={cpfs}
          selectedCPF={selectedCPF}
          onSelectCPF={setSelectedCPF}
        />
        {selectedCPF && (
          <CPFDetails
            selectedCPF={selectedCPF}
            updatePassword={updatePassword}
            deleteCPF={deleteCPF}
            redirectUser={redirectUser}
          />
        )}
      </div>

      {/* Right Panel: Actions */}
      <div id="cpf-right-panel">
        <CPFActions createCPF={createCPF} callApi={callApi} />
      </div>
    </div>
  );
};

export default App;
