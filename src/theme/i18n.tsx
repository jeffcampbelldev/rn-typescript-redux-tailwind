import React, { createContext, useState, useContext, useMemo } from 'react';
import { Platform, NativeModules } from 'react-native';
import languages from '_app/translations';
import { LANGUAGE } from '_app/types';

interface I18nContextType {
  translations: typeof languages[LANGUAGE];
  language: LANGUAGE;
  availableLanguages: Array<LANGUAGE>;
  changeLanguage: (ln: LANGUAGE) => void;
}

const defaultState: I18nContextType = {
  translations: languages.en,
  language: 'en',
  availableLanguages: Object.keys(languages) as Array<LANGUAGE>,
  changeLanguage: () => {},
};

const I18nContext = createContext<I18nContextType>(defaultState);

export const useI18n = () => useContext(I18nContext);

export const I18nProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState<LANGUAGE>(defaultState.language);

  const deviceLocale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || // < iOS 13
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const deviceLanguage = deviceLocale.includes('_') ? deviceLocale.split('_')[0] : deviceLocale;

  const devicePreferableLanguage: LANGUAGE = defaultState.availableLanguages.includes(deviceLanguage) ? deviceLanguage : defaultState.language;

  const activeLanguage = language || devicePreferableLanguage;

  const changeLanguage = (ln: LANGUAGE) => setLanguage(ln);

  const translations = useMemo(() => languages[activeLanguage], [activeLanguage]);

  return (
    <I18nContext.Provider
      value={{
        changeLanguage,
        translations,
        language: activeLanguage,
        availableLanguages: defaultState.availableLanguages,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
