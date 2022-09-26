// Initial configuration
const axios = require('axios').default;

// External API Endpoints and tokens
const baseAPIEndpoint = 'https://echo-serv.tbxnet.com/v1';
const getAllFilesEndpoint = '/secret/files';
const getASingleFileEndpoint = '/secret/file';
const authorizationToken = 'Bearer aSuperSecretKey';

// GET ALL FILES REQUEST
const getAllFilesRequest = async () => {
    try {
        const response = await axios.get(`${baseAPIEndpoint}${getAllFilesEndpoint}`, {
            headers: {
                'Authorization': authorizationToken
            }
        });
        let files = response.data.files;
        return files;
    } catch (error) {
        console.error(error.message);
    }
};

// GET A SINGLE FILE REQUEST
const getASingleFileRequest = async (fileName) => {
    try {
        const response = await axios.get(`${baseAPIEndpoint}${getASingleFileEndpoint}/${fileName}`, {
            headers: {
                'Authorization': authorizationToken
            }
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

// Input: ---
// Output: List with all file contents
function downloadFilesFromExternalAPI() {
    // getAllFilesRequest => Array(String)
    return getAllFilesRequest()
    .then((response) => {
        console.log(`Total amount of files found: ${response.length}\nDownloading...`);
        // Mapping Array(String) -> Array(Promise(String))
        const fileContentPromises = response.map(file => getASingleFileRequest(file));
        return Promise.all(fileContentPromises);
    }).catch((err) => {
        console.error(err);
    });
};



// Exports
module.exports.downloadFilesFromExternalAPI = downloadFilesFromExternalAPI;