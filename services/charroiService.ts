import axios, { AxiosResponse } from 'axios';
import config from '../config';

const { REACT_APP_SERVER_DOMAIN } = config;
const BASE_URL = `${REACT_APP_SERVER_DOMAIN}/api/charroi`;

/**
 * Requête générique GET
 * @param endpoint - le chemin relatif à BASE_URL
 */
const fetchData = async (endpoint: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response;
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${endpoint} :`, error);
    throw error;
  }
};

export const getVehiculeDispo = () => fetchData('vehicule_dispo');
export const getChauffeur = () => fetchData('chauffeur');
export const getServiceDemandeur = () => fetchData('serviceDemadeur');
export const getMotif = () => fetchData('motif');
export const getDestination = () => fetchData('destination');

/**
 * Envoie les données de retour exceptionnel d'un véhicule
 * @param data - les données à envoyer
 */
export const postRetourVehiculeExceptionnel = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/retour_vehicule_exceptionnel`, data);
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du retour véhicule exceptionnel :', error);
    throw error;
  }
};

export const postSortieVehiculeExceptionnel = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${BASE_URL}/sortie_vehicule_exceptionnel`, data);
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du sortie véhicule exceptionnel :', error);
    throw error;
  }
};
