import axios, { AxiosResponse } from 'axios';
import config from '../config';

const { REACT_APP_SERVER_DOMAIN } = config;
const BASE_URL = `${REACT_APP_SERVER_DOMAIN}/api/charroi`;

/**
 * Requête générique GET
 */
const fetchData = async (endpoint: string): Promise<AxiosResponse<any>> => {
  try {
    return await axios.get(`${BASE_URL}/${endpoint}`);
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${endpoint} :`, error);
    throw error;
  }
};

// Requêtes GET
export const getCatVehicule = () => fetchData('cat_vehicule');
export const getSortieVisiteur = () => fetchData('visiteur_retour');
export const getVehiculeDispo = () => fetchData('vehicule_dispo');
export const getChauffeur = () => fetchData('chauffeur');
export const getServiceDemandeur = () => fetchData('serviceDemadeur');
export const getMotif = () => fetchData('motif');
export const getDestination = () => fetchData('destination');
export const getRetourVehicule = () => fetchData('retour_vehicule');
export const getSortieVehicule = () => fetchData('sortie_vehicule');

/**
 * Requêtes POST
 */
export const postRetourVehiculeExceptionnel = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${BASE_URL}/retour_vehicule_exceptionnel`, data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du retour véhicule exceptionnel :", error);
    throw error;
  }
};

export const postSortieVehiculeExceptionnel = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${BASE_URL}/sortie_vehicule_exceptionnel`, data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la sortie véhicule exceptionnelle :", error);
    throw error;
  }
};

export const postSortieVehicule = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${BASE_URL}/sortie_vehicule`, data);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la sortie véhicule :", error);
    throw error;
  }
};

export const postRetourVehicule = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${BASE_URL}/retour_vehicule`, data);
  } catch (error) {
    console.error("Erreur lors de l'envoi du retour véhicule :", error);
    throw error;
  }
};

export const postVisiteurVehicule = async (
  data: Record<string, any>
): Promise<AxiosResponse<any>> => {
  try {
    return await axios.post(`${BASE_URL}/visiteur_vehicule`, data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
} );
  } catch (error) {
    console.error("Erreur lors de l'envoi du visiteur véhicule :", error);
    throw error;
  }
};

/**
 * Requête PUT
 */
export const putSortieVisiteur = async (id: number): Promise<AxiosResponse<any>> => {
  try {
    return await axios.put(`${BASE_URL}/visiteur_retour`, null, {
      params: { id_registre_visiteur: id },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la sortie visiteur :", error);
    throw error;
  }
};

/**
 * Recherche visiteur véhicule
 * @param search - texte de recherche
 */
export const getVisiteurVehiculeSearch = async (search: string): Promise<AxiosResponse<any>> => {
  try {
    return await axios.get(`${BASE_URL}/visiteur_vehicule_search`, {
      params: { search },
    });
  } catch (error) {
    console.error("Erreur lors de la recherche du visiteur véhicule :", error);
    throw error;
  }
};
