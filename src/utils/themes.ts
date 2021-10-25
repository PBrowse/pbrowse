import { lightTheme, darkTheme,  blueTheme, glassTheme, testTheme, cdayTheme} from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'wexond-light') return lightTheme;
  else if (name === 'wexond-dark') return darkTheme;
  else if (name === 'wexond-blue') return blueTheme;
  else if (name === 'wexond-tests') return testTheme; 
  else if (name === 'wexond-cday') return cdayTheme;
  else if (name === 'wexond-glass') return glassTheme;
  return lightTheme;
};
