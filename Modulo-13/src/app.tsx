import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccountListPage } from './pods/account-list';
import { MovementsPage } from './pods/movements';
import { AppLayout } from './layouts/app.layout';
import { routes } from './core/router';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={routes.accountList} replace />} />
          <Route path="account-list" element={<AccountListPage />} />
          <Route path="movements/:id" element={<MovementsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.accountList} replace />} />
      </Routes>
    </Router>
  );
};
