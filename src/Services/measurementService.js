
import {API} from './webpageInstance';

export const getMeasurements = async () => {
  return await API.get("/measurement");
};

export const AddMeasurement = async (measurement) => {
  return await API.post("/measurement", measurement);
};

export const getMeasurementById = async (id) => {
  return await API.get(`/measurement/${id}`);
};

export const updateMeasurement= async(measurement) => {
  return await API.put(`/measurement/${measurement.id}`, measurement)
};

export const deleteMeasurement= async(measurement) => {
  return await API.delete(`/measurement/${measurement.id}`)
};