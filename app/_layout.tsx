import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // adapte le chemin

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}