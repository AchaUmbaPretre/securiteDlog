import axios, { AxiosResponse } from 'axios';
import config from '../config';

const { REACT_APP_SERVER_DOMAIN } = config;
const BASE_URL = `${REACT_APP_SERVER_DOMAIN}/api/user`;

/**
 * Requête générique GET
 * @param endpoint - chemin relatif à BASE_URL
 */
export const fetchData = async (endpoint: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response;
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${endpoint} :`, error);
    throw error;
  }
};

/**
 * Récupère les données de retour piéton
 */
export const getPietonRetour = async (): Promise<AxiosResponse<any>> => {
  try {
    return await axios.get(`${BASE_URL}/pieton_retour`);
  } catch (error) {
    console.error('Erreur lors de la récupération des piétons retour :', error);
    throw error;
  }
};

/**
 * Marque le retour d’un piéton par son ID
 * @param id - identifiant du visiteur
 */
export const putPietonRetour = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    return await axios.put(`${BASE_URL}/pieton_retour`, null, {
      params: { id_visiteur: id },
    });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du retour piéton pour l'ID ${id} :`, error);
    throw error;
  }
};
