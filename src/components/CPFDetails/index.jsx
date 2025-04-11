import React from 'react';

const CPFDetails = ({ selectedCPF, updatePassword, deleteCPF, redirectUser }) => {
  return (
    <div id="selected-cpf-details">
      <label>Password: </label>
      <input
        type="password"
        value={selectedCPF.password}
        onChange={(e) => updatePassword(selectedCPF.id, e.target.value)}
      />
      <br /><br />
      <button onClick={() => deleteCPF(selectedCPF.id)}>Delete CPF</button>
      <span> </span>
      <button onClick={() => console.log('Log in for CPF:', selectedCPF)}>Log in</button>
      <br /><br />
      <button onClick={() => redirectUser('https://newpage.com')}>Redirect</button>
    </div>
  );
};

export default CPFDetails;
