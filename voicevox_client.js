const axios = require('axios');
const fs = require('fs');

class voicevox_engine {
    #url = 'http://127.0.0.1:50021';

    constructor(host, port) {
        this.#url = `http://${host}:${port}`;
    };

    #request(payload) { //make it get post
        return axios(payload)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log(error)
            });
    };

    //Query creation
    audioQuery(input, speaker_id) {
        var url = this.#url + `/audio_query?speaker=${speaker_id}&text=${input}`

        return this.#request({
            method: 'post',
            url: url,
        })
    };

    audioQueryfromPreset(text, preset_id, core_version = undefined) {
        var url = "";
        if (core_version == undefined) {
            url = this.#url + `/audio_query_from_preset?text=${text}&preset_id=${preset_id}`
        } else {
            url = this.#url + `/audio_query_from_preset?text=${text}&preset_id=${preset_id}&core_version=${core_version}`
        }
        return this.#request({
            method: 'post',
            url: url,
        })
    };

    //Query edit
    AccentPhrases(text, speaker_id, is_his = false, core_version = undefined) {
        var url = "";
        if (core_version == undefined) {
            url = this.#url + `/accent_phrases?text=${text}&speaker=${speaker_id}&is_his=${is_his}`
        } else {
            url = this.#url + `/accent_phrases?text=${text}&speaker=${speaker_id}&is_his=${is_his}&core_version=${core_version}`
        }
        return this.#request({
            method: 'post',
            url: url,
        })
    };

    /* TODO: fix this
    MoraData(array, speaker_id, core_version = undefined) {
        var url = "";
        if (core_version == undefined) {
            url = this.#url + `/mora_data?speaker=${speaker_id}`
        } else {
            url = this.#url + `/mora_data?speaker=${speaker_id}&core_version=${core_version}`
        }
    };

    MoraLength(array, speaker_id, core_version = undefined) {
        var url = "";
        if (core_version == undefined) {
            url = this.#url + `/mora_length?speaker=${speaker_id}`
        } else {
            url = this.#url + `/mora_length?speaker=${speaker_id}&core_version=${core_version}`
        }
    };

    MoraPitch(speaker_id, core_version = undefined) {
        var url = "";
        if (core_version == undefined) {
            url = this.#url + `/mora_pitch?speaker=${speaker_id}`
        } else {
            url = this.#url + `/mora_pitch?speaker=${speaker_id}&core_version=${core_version}`
        }
    };
    */

    //Speech synthesis
    synthesize(path, filename, json_query, speaker_id, enable_interrogative = true, core_version = undefined) {
        var url = "";
        const writer = fs.createWriteStream(`${path}/${filename}.wav`);

        if (core_version == undefined) {
            url = this.#url + `/synthesis?speaker=${speaker_id}&enable_interrogative=${enable_interrogative}`
        } else {
            url = this.#url + `/synthesis?speaker=${speaker_id}&enable_interrogative=${enable_interrogative}&core_version=${core_version}`
        }

        this.#request({
            method: 'post',
            url: url,
            data: json_query,
            responseType: 'stream'
        }).then(function (response) {
            if (!response) {
                console.error('Response data is missing or empty.');
                return;
            }
            response.pipe(writer);
            writer.on('finish', () => {
                console.log(`\n${filename}.wav has been written to ${path}`);
            });
        }).catch(function (error) {
            console.error('Error occurred during request:', error);
        });
    }

    /* TODO: fix this
    cancellableSynthesize(path, filename, json_query, speaker_id, core_version = undefined) {
        var url = "";
        const writer = fs.createWriteStream(`${path}/${filename}.wav`);

        if(core_version == undefined){
            url = this.#url + `/cancellable_synthesis?speaker=${speaker_id}`
        }else{
            url = this.#url + `/cancellable_synthesis?speaker=${speaker_id}&core_version=${core_version}`
        }
    }
    synthesizeMultiple(path, filename, json_query, speaker_id, core_version = undefined) {
        var url = "";
        const writer = fs.createWriteStream(`${path}/${filename}.wav`);

        if(core_version == undefined){
            url = this.#url + `/multi_synthesis?speaker=${speaker_id}`
        }else{
            url = this.#url + `/multi_synthesis?speaker=${speaker_id}&core_version=${core_version}`
        }
    };
    determineMorphableTargets(aray, core_version = undefined) {};
    sinthesizeMorphing(base_speaker, target_speaker, morph_rate, core_version = undefined) {};
    base64Encode(array){
        var url = this.#url + `/connect_waves`
    };
     */

    //Others
    getPresets() {
        return this.#request({
            method: 'get',
            url: this.#url + '/presets'
        })
    };

    addPreset(obj) {
        var url = this.#url + '/add_preset'

        return this.#request({
            method: 'post',
            url: url,
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    updatePreset(obj) {
        var url = this.#url + '/update_preset'
        return this.#request({
            method: 'post',
            url: url,
            data: obj,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };

    deletePreset(id) {
        var url = `${this.#url}/delete_preset?id=${id}`
        return this.#request({
            method: 'post',
            url: url,
        });
    };

    getVersion() {
        return this.#request({
            method: 'get',
            url: this.#url + '/version'
        });
    };

    getcoreVersion() {
        return this.#request({
            method: 'get',
            url: this.#url + '/core_versions'
        });
    };

    getSpeakers() {
        return this.#request({
            method: 'get',
            url: this.#url + '/speakers'
        });
    };

    getSpeakerInfo(speaker_uuid, core_version = undefined) {
        var url = '';
        if (core_version == undefined) {
            url = `${this.#url}/speakers/?speaker_uuid=${speaker_uuid}`
        } else {
            url = `${this.#url}/speakers/?speaker_uuid=${speaker_uuid}&core_version=${core_version}`
        }
        return this.#request({
            method: 'get',
            url: url
        });
    };

    initializeSpeaker(speaker_id, skip_reinit = false, core_version = undefined) {
        var url = '';
        if (core_version == undefined) {
            url = `${this.#url}/initialize_speaker?speaker=${speaker_id}&skip_reinit=${skip_reinit}`
        } else {
            url = `${this.#url}/initialize_speaker?speaker=${speaker_id}&skip_reinit=${skip_reinit}&core_version=${core_version}`
        }
        return this.#request({
            method: 'post',
            url: url
        });
    };

    isSpeakerInitialized(speaker_id, core_version = undefined) {
        var url = '';
        if (core_version == undefined) {
            url = `${this.#url}/is_initialized_speaker?speaker=${speaker_id}`
        } else {
            url = `${this.#url}/is_initialized_speaker?speaker=${speaker_id}&core_version=${core_version}`
        }
        return this.#request({
            method: 'get',
            url: url
        });
    };

    getSupportedDevices(core_version = undefined) {
        var url = '';
        if (core_version == undefined) {
            url = `${this.#url}/supported_devices`
        } else {
            url = `${this.#url}/supported_devices?core_version=${core_version}`
        }
        return this.#request({
            method: 'get',
            url: url
        });
    };

    getEngineManifest() {
        return this.#request({
            method: 'get',
            url: this.#url + '/engine_manifest'
        });
    };

    //Sound library management
    /* TODO: fix this
    getDownloadableSoundLibraries() {
        return this.#request({
            method: 'get',
            url: this.#url + '/downloadable_libraries',
        });
    };
    
    getInstalledSoundLibraries() {
        return this.#request({
            method: 'get',
            url: this.#url + '/installed_libraries'
        })
    };
    
   installSoundLibrary(library_uuid) {
    var url = `${this.#url}/install_library?library_uuid=${library_uuid}`
    return this.#request({
        method: 'post',
        url: url
    });
    */
   //User dictionary
    getUserDictWords() {
        return this.#request({
            method: 'get',
            url: this.#url + '/user_dict'
        })
    };
    /*
    addUserDictWord() {};
    rewriteUserDictWord() {};
    deleteUserDictWord() {};
    importUserDict() {};
    */
   //Settings
    getSettings() {
        return this.#request({
            method: 'get',
            url: this.#url + '/setting'
        })
    };
    setSettings(cors_policy_mode, allow_origin){
        var url = `${this.#url}/setting`

        return this.#request({
            method: 'post',
            url: url,
            data: {
                cors_policy_mode: cors_policy_mode,
                allow_origin: allow_origin
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
}

module.exports = {
    voicevox_engine
};