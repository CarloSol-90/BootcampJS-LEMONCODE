import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, AccountListPage, MovementsPage, TransferPage, CreateAccountPage } from './pages';
import { AppLayout } from './layouts/app.layout';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/account-list" replace />} />
          <Route path="account-list" element={<AccountListPage />} />
          <Route path="create-account" element={<CreateAccountPage />} />
          <Route path="movements/:id" element={<MovementsPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="transfer/:accountId" element={<TransferPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};
