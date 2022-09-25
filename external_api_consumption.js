// Initial configuration
const axios = require('axios').default;
const fs = require('fs');

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

// Executing external API Requests and writing into system
async function downloadFilesFromExternalAPI(destinationPath) {
    getAllFilesRequest().then(function(response) {
        console.log(`Total amount of files found: ${response.length}\nDownloading...`);
        
        // Download each file found
        for(i in response) {
            let fileName = response[i];
            console.log(`Attempting to download: "${fileName}"...`);
            getASingleFileRequest(fileName).then(function(response) {
                fs.writeFile(`${destinationPath}/${fileName}`, response, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
                console.log(`Successfully downloaded: '${fileName}'`);
            })
            .catch(function(error) {
                console.log(`Failed to download: '${fileName}'`);
            });
        };
    }).catch(function(err) {
        console.error(err);
    });
};

// Exports
module.exports.downloadFilesFromExternalAPI = downloadFilesFromExternalAPI;