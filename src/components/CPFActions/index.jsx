import React from 'react';

const CPFActions = ({ createCPF, callApi }) => {
  return (
    <div id="cpf-actions">
      <button onClick={createCPF}>Create CPF</button>
      <br /><br />
      <input type="checkbox" id="checkbox1" />
      <label htmlFor="checkbox1"> Option 1</label>
      <br />
      <input type="checkbox" id="checkbox2" />
      <label htmlFor="checkbox2"> Option 2</label>
      <br /><br />
      <button onClick={callApi}>Call API</button>
    </div>
  );
};

export default CPFActions;
