import { RouterProvider } from 'react-router-dom';

/** Routes **/
import router from 'routes';

/** Themes **/
import ThemeCustomization from 'themes';

/** Components **/
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
