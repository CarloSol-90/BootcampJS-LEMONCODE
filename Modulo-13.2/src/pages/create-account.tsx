import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAccount } from '../api/api';
import { CreateAccountRequest } from '../api/api-model';

export const CreateAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<CreateAccountRequest>({
    type: '',
    name: ''
  });
  const [errors, setErrors] = useState<{type?: string; name?: string}>({});

  const validateForm = (): boolean => {
    const newErrors: {type?: string; name?: string} = {};
    
    if (!account.type) {
      newErrors.type = 'Debe elegir una cuenta';
    }
    
    if (!account.name.trim()) {
      newErrors.name = 'Debe introducir un alias';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await saveAccount(account);
      navigate('/account-list');
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccount(prev => ({ ...prev, type: e.target.value }));
    if (errors.type) {
      setErrors(prev => ({ ...prev, type: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => ({ ...prev, name: e.target.value }));
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  return (
    <div className="create-account-page">
      <h1>Create/Edit Account</h1>
      
      <div className="account-form">
        <h2>Cuenta Bancaria</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="account-type">Tipo de cuenta:</label>
            <select
              id="account-type"
              value={account.type}
              onChange={handleTypeChange}
              className={errors.type ? 'error' : ''}
            >
              <option value="">Seleccionar</option>
              <option value="cuenta corriente">Cuenta Corriente</option>
              <option value="ahorro">Ahorro</option>
            </select>
            {errors.type && <span className="error-message">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="account-alias">Alias:</label>
            <input
              id="account-alias"
              type="text"
              value={account.name}
              onChange={handleNameChange}
              className={errors.name ? 'error' : ''}
              placeholder="Introduce un alias para la cuenta"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <button type="submit" className="btn-primary">
            GUARDAR
          </button>
        </form>
      </div>
    </div>
  );
};
