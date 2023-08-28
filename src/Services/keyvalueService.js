import {API} from './webpageInstance';

export const getAllKeyValueByKeyId = async (id) => {
    return await API.get(`/KeyValue/getAllFromKey?id=${id}`);
};
export const getAllKeyValueByObjectiveId = async (id) => {
    return await API.get(`/KeyValue/getAllFromObj?id=${id}`);
};