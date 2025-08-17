interface Routes {
  accountList: string;
  movements: string;
  login: string;
}

export const routes: Routes = {
  accountList: '/account-list',
  movements: '/movements/:id',
  login: '/login',
};

export const generatePath = {
  movements: (id: string) => `/movements/${id}`,
};
