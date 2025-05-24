import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'es' | 'fr' | 'de' | 'pt';

export interface Translation {
  // Navigation
  home: string;
  reports: string;
  alerts: string;
  settings: string;
  
  // Header
  appName: string;
  appSubtitle: string;
  
  // Home page
  welcome: string;
  farmStatus: string;
  waterQuality: string;
  soilMoisture: string;
  weatherPrediction: string;
  irrigationTip: string;
  
  // Reports page
  reportsTitle: string;
  reportsSubtitle: string;
  waterUsage: string;
  waterUsageDesc: string;
  soilHealth: string;
  soilHealthDesc: string;
  seasonalAnalytics: string;
  seasonalAnalyticsDesc: string;
  viewDetails: string;
  
  // Alerts page
  alertsTitle: string;
  alertsSubtitle: string;
  clearAll: string;
  loadMore: string;
  allCaughtUp: string;
  allCaughtUpDesc: string;
  
  // Settings page
  settingsTitle: string;
  settingsSubtitle: string;
  account: string;
  profileInfo: string;
  language: string;
  preferences: string;
  darkMode: string;
  enableAnimations: string;
  pushNotifications: string;
  support: string;
  helpFaq: string;
  logout: string;
  editProfile: string;
  myFarms: string;
  
  // Common
  loading: string;
  back: string;
  
  // Toast messages
  darkModeEnabled: string;
  lightModeEnabled: string;
  themeUpdated: string;
  languageChanged: string;
}

const translations: Record<Language, Translation> = {
  en: {
    // Navigation
    home: 'Home',
    reports: 'Reports',
    alerts: 'Alerts',
    settings: 'Settings',
    
    // Header
    appName: 'JalSetu',
    appSubtitle: 'Smart Water Management',
    
    // Home page
    welcome: 'Welcome',
    farmStatus: 'Farm Status',
    waterQuality: 'Water Quality',
    soilMoisture: 'Soil Moisture',
    weatherPrediction: 'Weather Prediction',
    irrigationTip: 'Smart Irrigation Tip',
    
    // Reports page
    reportsTitle: 'Reports',
    reportsSubtitle: 'Track your farm performance',
    waterUsage: 'Water Usage',
    waterUsageDesc: 'Track irrigation and rainfall data',
    soilHealth: 'Soil Health',
    soilHealthDesc: 'Analyze soil moisture and nutrients',
    seasonalAnalytics: 'Seasonal Analytics',
    seasonalAnalyticsDesc: 'Analyze growing season performance',
    viewDetails: 'View Details',
    
    // Alerts page
    alertsTitle: 'Alerts',
    alertsSubtitle: 'Important notifications',
    clearAll: 'Clear All',
    loadMore: 'Load More',
    allCaughtUp: 'All Caught Up!',
    allCaughtUpDesc: "You've dismissed all alerts. Check back later for new notifications.",
    
    // Settings page
    settingsTitle: 'Settings',
    settingsSubtitle: 'Customize your app experience',
    account: 'Account',
    profileInfo: 'Profile Information',
    language: 'Language',
    preferences: 'Preferences',
    darkMode: 'Dark Mode',
    enableAnimations: 'Enable Animations',
    pushNotifications: 'Push Notifications',
    support: 'Support',
    helpFaq: 'Help & FAQ',
    logout: 'Logout',
    editProfile: 'Edit Profile',
    myFarms: 'My Farms',
    
    // Common
    loading: 'Loading...',
    back: 'Back',
    
    // Toast messages
    darkModeEnabled: 'Dark mode enabled',
    lightModeEnabled: 'Light mode enabled',
    themeUpdated: 'Your theme preference has been updated.',
    languageChanged: 'Language changed successfully',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    reports: 'रिपोर्ट',
    alerts: 'अलर्ट',
    settings: 'सेटिंग्स',
    
    // Header
    appName: 'जलसेतु',
    appSubtitle: 'स्मार्ट जल प्रबंधन',
    
    // Home page
    welcome: 'स्वागत',
    farmStatus: 'खेत की स्थिति',
    waterQuality: 'पानी की गुणवत्ता',
    soilMoisture: 'मिट्टी की नमी',
    weatherPrediction: 'मौसम की भविष्यवाणी',
    irrigationTip: 'स्मार्ट सिंचाई टिप',
    
    // Reports page
    reportsTitle: 'रिपोर्ट',
    reportsSubtitle: 'अपने खेत के प्रदर्शन को ट्रैक करें',
    waterUsage: 'पानी का उपयोग',
    waterUsageDesc: 'सिंचाई और बारिश के डेटा को ट्रैक करें',
    soilHealth: 'मिट्टी का स्वास्थ्य',
    soilHealthDesc: 'मिट्टी की नमी और पोषक तत्वों का विश्लेषण करें',
    seasonalAnalytics: 'मौसमी विश्लेषण',
    seasonalAnalyticsDesc: 'बढ़ते मौसम के प्रदर्शन का विश्लेषण करें',
    viewDetails: 'विवरण देखें',
    
    // Alerts page
    alertsTitle: 'अलर्ट',
    alertsSubtitle: 'महत्वपूर्ण सूचनाएं',
    clearAll: 'सभी साफ करें',
    loadMore: 'और लोड करें',
    allCaughtUp: 'सब अप-टू-डेट!',
    allCaughtUpDesc: 'आपने सभी अलर्ट खारिज कर दिए हैं। नई सूचनाओं के लिए बाद में जांचें।',
    
    // Settings page
    settingsTitle: 'सेटिंग्स',
    settingsSubtitle: 'अपने ऐप अनुभव को कस्टमाइज़ करें',
    account: 'खाता',
    profileInfo: 'प्रोफ़ाइल जानकारी',
    language: 'भाषा',
    preferences: 'प्राथमिकताएं',
    darkMode: 'डार्क मोड',
    enableAnimations: 'एनीमेशन सक्षम करें',
    pushNotifications: 'पुश नोटिफिकेशन',
    support: 'सहायता',
    helpFaq: 'सहायता और FAQ',
    logout: 'लॉग आउट',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    myFarms: 'मेरे खेत',
    
    // Common
    loading: 'लोड हो रहा है...',
    back: 'वापस',
    
    // Toast messages
    darkModeEnabled: 'डार्क मोड सक्षम',
    lightModeEnabled: 'लाइट मोड सक्षम',
    themeUpdated: 'आपकी थीम प्राथमिकता अपडेट हो गई है।',
    languageChanged: 'भाषा सफलतापूर्वक बदली गई',
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    reports: 'Informes',
    alerts: 'Alertas',
    settings: 'Configuración',
    
    // Header
    appName: 'JalSetu',
    appSubtitle: 'Gestión Inteligente del Agua',
    
    // Home page
    welcome: 'Bienvenido',
    farmStatus: 'Estado de la Granja',
    waterQuality: 'Calidad del Agua',
    soilMoisture: 'Humedad del Suelo',
    weatherPrediction: 'Predicción del Tiempo',
    irrigationTip: 'Consejo de Riego Inteligente',
    
    // Reports page
    reportsTitle: 'Informes',
    reportsSubtitle: 'Rastrea el rendimiento de tu granja',
    waterUsage: 'Uso del Agua',
    waterUsageDesc: 'Rastrea datos de riego y lluvia',
    soilHealth: 'Salud del Suelo',
    soilHealthDesc: 'Analiza la humedad y nutrientes del suelo',
    seasonalAnalytics: 'Análisis Estacional',
    seasonalAnalyticsDesc: 'Analiza el rendimiento de la temporada de crecimiento',
    viewDetails: 'Ver Detalles',
    
    // Alerts page
    alertsTitle: 'Alertas',
    alertsSubtitle: 'Notificaciones importantes',
    clearAll: 'Limpiar Todo',
    loadMore: 'Cargar Más',
    allCaughtUp: '¡Todo al Día!',
    allCaughtUpDesc: 'Has descartado todas las alertas. Vuelve más tarde para nuevas notificaciones.',
    
    // Settings page
    settingsTitle: 'Configuración',
    settingsSubtitle: 'Personaliza tu experiencia de la app',
    account: 'Cuenta',
    profileInfo: 'Información del Perfil',
    language: 'Idioma',
    preferences: 'Preferencias',
    darkMode: 'Modo Oscuro',
    enableAnimations: 'Habilitar Animaciones',
    pushNotifications: 'Notificaciones Push',
    support: 'Soporte',
    helpFaq: 'Ayuda y FAQ',
    logout: 'Cerrar Sesión',
    editProfile: 'Editar Perfil',
    myFarms: 'Mis Granjas',
    
    // Common
    loading: 'Cargando...',
    back: 'Atrás',
    
    // Toast messages
    darkModeEnabled: 'Modo oscuro habilitado',
    lightModeEnabled: 'Modo claro habilitado',
    themeUpdated: 'Tu preferencia de tema ha sido actualizada.',
    languageChanged: 'Idioma cambiado exitosamente',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    reports: 'Rapports',
    alerts: 'Alertes',
    settings: 'Paramètres',
    
    // Header
    appName: 'JalSetu',
    appSubtitle: 'Gestion Intelligente de l\'Eau',
    
    // Home page
    welcome: 'Bienvenue',
    farmStatus: 'État de la Ferme',
    waterQuality: 'Qualité de l\'Eau',
    soilMoisture: 'Humidité du Sol',
    weatherPrediction: 'Prévision Météo',
    irrigationTip: 'Conseil d\'Irrigation Intelligent',
    
    // Reports page
    reportsTitle: 'Rapports',
    reportsSubtitle: 'Suivez les performances de votre ferme',
    waterUsage: 'Utilisation de l\'Eau',
    waterUsageDesc: 'Suivez les données d\'irrigation et de pluie',
    soilHealth: 'Santé du Sol',
    soilHealthDesc: 'Analysez l\'humidité et les nutriments du sol',
    seasonalAnalytics: 'Analyses Saisonnières',
    seasonalAnalyticsDesc: 'Analysez les performances de la saison de croissance',
    viewDetails: 'Voir les Détails',
    
    // Alerts page
    alertsTitle: 'Alertes',
    alertsSubtitle: 'Notifications importantes',
    clearAll: 'Tout Effacer',
    loadMore: 'Charger Plus',
    allCaughtUp: 'Tout est à Jour!',
    allCaughtUpDesc: 'Vous avez supprimé toutes les alertes. Revenez plus tard pour de nouvelles notifications.',
    
    // Settings page
    settingsTitle: 'Paramètres',
    settingsSubtitle: 'Personnalisez votre expérience d\'application',
    account: 'Compte',
    profileInfo: 'Informations du Profil',
    language: 'Langue',
    preferences: 'Préférences',
    darkMode: 'Mode Sombre',
    enableAnimations: 'Activer les Animations',
    pushNotifications: 'Notifications Push',
    support: 'Support',
    helpFaq: 'Aide et FAQ',
    logout: 'Déconnexion',
    editProfile: 'Modifier le Profil',
    myFarms: 'Mes Fermes',
    
    // Common
    loading: 'Chargement...',
    back: 'Retour',
    
    // Toast messages
    darkModeEnabled: 'Mode sombre activé',
    lightModeEnabled: 'Mode clair activé',
    themeUpdated: 'Votre préférence de thème a été mise à jour.',
    languageChanged: 'Langue changée avec succès',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    reports: 'Berichte',
    alerts: 'Benachrichtigungen',
    settings: 'Einstellungen',
    
    // Header
    appName: 'JalSetu',
    appSubtitle: 'Intelligente Wasserwirtschaft',
    
    // Home page
    welcome: 'Willkommen',
    farmStatus: 'Farm-Status',
    waterQuality: 'Wasserqualität',
    soilMoisture: 'Bodenfeuchtigkeit',
    weatherPrediction: 'Wettervorhersage',
    irrigationTip: 'Intelligenter Bewässerungstipp',
    
    // Reports page
    reportsTitle: 'Berichte',
    reportsSubtitle: 'Verfolgen Sie die Leistung Ihrer Farm',
    waterUsage: 'Wasserverbrauch',
    waterUsageDesc: 'Verfolgen Sie Bewässerungs- und Regendaten',
    soilHealth: 'Bodengesundheit',
    soilHealthDesc: 'Analysieren Sie Bodenfeuchtigkeit und Nährstoffe',
    seasonalAnalytics: 'Saisonale Analysen',
    seasonalAnalyticsDesc: 'Analysieren Sie die Leistung der Wachstumssaison',
    viewDetails: 'Details Anzeigen',
    
    // Alerts page
    alertsTitle: 'Benachrichtigungen',
    alertsSubtitle: 'Wichtige Mitteilungen',
    clearAll: 'Alle Löschen',
    loadMore: 'Mehr Laden',
    allCaughtUp: 'Alles Aktuell!',
    allCaughtUpDesc: 'Sie haben alle Benachrichtigungen entfernt. Schauen Sie später nach neuen Mitteilungen.',
    
    // Settings page
    settingsTitle: 'Einstellungen',
    settingsSubtitle: 'Passen Sie Ihre App-Erfahrung an',
    account: 'Konto',
    profileInfo: 'Profilinformationen',
    language: 'Sprache',
    preferences: 'Einstellungen',
    darkMode: 'Dunkler Modus',
    enableAnimations: 'Animationen Aktivieren',
    pushNotifications: 'Push-Benachrichtigungen',
    support: 'Support',
    helpFaq: 'Hilfe & FAQ',
    logout: 'Abmelden',
    editProfile: 'Profil Bearbeiten',
    myFarms: 'Meine Farmen',
    
    // Common
    loading: 'Lädt...',
    back: 'Zurück',
    
    // Toast messages
    darkModeEnabled: 'Dunkler Modus aktiviert',
    lightModeEnabled: 'Heller Modus aktiviert',
    themeUpdated: 'Ihre Theme-Einstellung wurde aktualisiert.',
    languageChanged: 'Sprache erfolgreich geändert',
  },
  
  pt: {
    // Navigation
    home: 'Início',
    reports: 'Relatórios',
    alerts: 'Alertas',
    settings: 'Configurações',
    
    // Header
    appName: 'JalSetu',
    appSubtitle: 'Gestão Inteligente da Água',
    
    // Home page
    welcome: 'Bem-vindo',
    farmStatus: 'Status da Fazenda',
    waterQuality: 'Qualidade da Água',
    soilMoisture: 'Umidade do Solo',
    weatherPrediction: 'Previsão do Tempo',
    irrigationTip: 'Dica de Irrigação Inteligente',
    
    // Reports page
    reportsTitle: 'Relatórios',
    reportsSubtitle: 'Acompanhe o desempenho da sua fazenda',
    waterUsage: 'Uso da Água',
    waterUsageDesc: 'Acompanhe dados de irrigação e chuva',
    soilHealth: 'Saúde do Solo',
    soilHealthDesc: 'Analise umidade e nutrientes do solo',
    seasonalAnalytics: 'Análises Sazonais',
    seasonalAnalyticsDesc: 'Analise o desempenho da temporada de crescimento',
    viewDetails: 'Ver Detalhes',
    
    // Alerts page
    alertsTitle: 'Alertas',
    alertsSubtitle: 'Notificações importantes',
    clearAll: 'Limpar Tudo',
    loadMore: 'Carregar Mais',
    allCaughtUp: 'Tudo em Dia!',
    allCaughtUpDesc: 'Você descartou todos os alertas. Volte mais tarde para novas notificações.',
    
    // Settings page
    settingsTitle: 'Configurações',
    settingsSubtitle: 'Personalize sua experiência no app',
    account: 'Conta',
    profileInfo: 'Informações do Perfil',
    language: 'Idioma',
    preferences: 'Preferências',
    darkMode: 'Modo Escuro',
    enableAnimations: 'Ativar Animações',
    pushNotifications: 'Notificações Push',
    support: 'Suporte',
    helpFaq: 'Ajuda e FAQ',
    logout: 'Sair',
    editProfile: 'Editar Perfil',
    myFarms: 'Minhas Fazendas',
    
    // Common
    loading: 'Carregando...',
    back: 'Voltar',
    
    // Toast messages
    darkModeEnabled: 'Modo escuro ativado',
    lightModeEnabled: 'Modo claro ativado',
    themeUpdated: 'Sua preferência de tema foi atualizada.',
    languageChanged: 'Idioma alterado com sucesso',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  ];

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};