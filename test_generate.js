const voicevox = require('./voicevox_client.js');

const engine = new voicevox.voicevox_engine('127.0.0.1', 50021);

testinput = "おめでとうございます！うまくいったのですね、素晴らしいです！"
//some examples:
//猫使ビィ = 58
//猫使アル= 55
//ナースロボ＿タイプＴ = 47
//No7 = 29

voices = [58,55,47,29]

voices.forEach(speaker => {
    engine.audioQuery(testinput, speaker).then(function (response) {
        engine.synthesize('./',`${speaker}`,response, speaker)
    });
});

//available methods:

/*
engine.audioQueryfromPreset(testinput, 1).then(function (response) {
    engine.synthesize('C:\\Users\\ShiroNeko\\Desktop',"test2",response, speaker)
});

engine.AccentPhrases(testinput, speaker).then(function (response) {
    console.log(response);
});

engine.getPresets().then(function (response) {
    console.log(response);
});

test_preset = {
    "id": 0,
    "name": "test",
    "speaker_uuid": "882a636f-3bac-431a-966d-c5e6bba9f949",
    "style_id": 0,
    "speedScale": 1.0,
    "pitchScale": 0,
    "intonationScale": 1,
    "volumeScale": 1,
    "prePhonemeLength": 0.1,
    "postPhonemeLength": 0.1
}

engine.addPreset(test_preset).then(function (response) {
    console.log(response);
});

test_preset_edit = {
    "id": 0,
    "name": "test2",
    "speaker_uuid": "882a636f-3bac-431a-966d-c5e6bba9f949",
    "style_id": 0,
    "speedScale": 1.0,
    "pitchScale": 0,
    "intonationScale": 1,
    "volumeScale": 1,
    "prePhonemeLength": 0.1,
    "postPhonemeLength": 0.1
}

engine.updatePreset(test_preset_edit).then(function (response) {
    console.log(response);
});

engine.deletePreset(0).then(function (response) {
    console.log(response);
});

engine.getVersion().then(function (response) {
    console.log(response);
});

engine.getcoreVersion().then(function (response) {
    console.log(response);
});

engine.getSpeakers().then(function (response) {
    console.log(response[18]);
});

engine.getSpeakerinfo("882a636f-3bac-431a-966d-c5e6bba9f949").then(function (response) {
    console.log(response);
});

engine.initializeSpeaker(speaker).then(function (response) {
    console.log(response);
});

engine.isSpeakerInitialized(27).then(function (response) {
    console.log(response);
});

engine.getSupportedDevices().then(function (response) {
    console.log(response);
});

engine.getEngineManifest().then(function (response) {
    console.log(response);
});

engine.getUserDictWords().then(function (response) {
    console.log(response);
});

engine.setSettings("all","TEST").then(function (response) {
    console.log(response);
});
*/