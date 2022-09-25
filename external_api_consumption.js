// Initial configuration
const axios = require('axios').default;
const apiBasePath = 'https://echo-serv.tbxnet.com/v1';
const fs = require('fs');

// GET ALL FILES REQUEST
const getAllFiles = async () => {
    try {
        const response = await axios.get(`${apiBasePath}/secret/files`, {
            headers: {
                'Authorization': 'Bearer aSuperSecretKey'
            }
        });
        let files = response.data.files;
        return files;
    } catch (error) {
        console.error(error.message);
    }
};

// GET A SINGLE FILE REQUEST
const getASingleFile = async (fileName) => {
    try {
        const response = await axios.get(`${apiBasePath}/secret/file/${fileName}`, {
            headers: {
                'Authorization': 'Bearer aSuperSecretKey'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};

// Executing external API Requests and writing into system
async function externalAPICall() {
    getAllFiles().then(function(response) {
        console.log(`Total amount of files found: ${response.length}\nDownloading...`);

        // Download each file found
        for(i in response) {
            let fileName = response[i];
            console.log(`Attempting to download: "${fileName}"...`);
            getASingleFile(fileName).then(function(response) {
                fs.writeFile(`./files/${fileName}`, response, (err) => {
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
    });
};

// Exports
module.exports.externalAPICall = externalAPICall;