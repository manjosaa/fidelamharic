import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fidel.amharic',
  appName: 'Fidel Amharic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {}
};

export default config;
