import { RouterProvider } from 'react-router-dom';

// project-imports
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  return (
    <>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
          <Snackbar />
        </ScrollTop>
      </ThemeCustomization>
    </>
  );
}
