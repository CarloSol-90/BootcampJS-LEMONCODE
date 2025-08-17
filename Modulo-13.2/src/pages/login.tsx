import React from 'react';

export const LoginPage: React.FC = () => {
  const handleLogin = () => {
    window.location.href = '/account-list';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo">
          <h1>AHBC</h1>
          <span>online banking</span>
        </div>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Usuario:</label>
            <input 
              type="email" 
              id="email" 
              defaultValue="admin@email.com"
              placeholder="admin@email.com"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              defaultValue="test"
              placeholder="test"
            />
          </div>
          
          <button type="button" onClick={handleLogin} className="login-btn">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};
