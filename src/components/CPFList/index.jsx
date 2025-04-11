import React from 'react';

const CPFList = ({ cpfs, selectedCPF, onSelectCPF }) => {
  return (
    <div id="cpf-list">
      <h3>CPF List</h3>
      {cpfs.length === 0 ? (
        <p>No CPFs created yet.</p>
      ) : (
        cpfs.map((cpf) => (
          <div
            key={cpf.id}
            className={`cpf-item ${selectedCPF && selectedCPF.id === cpf.id ? 'selected' : ''}`}
            onClick={() => onSelectCPF(cpf)}
          >
            {cpf.id}
          </div>
        ))
      )}
    </div>
  );
};

export default CPFList;
