# voicevox-client.js
Simple nodejs client for https://github.com/VOICEVOX/voicevox

- install via npm
```
npm install https://github.com/Shiro-Nek0/voicevox-client.js
```

Example usage:
``` js
    const voicevox = require('voicevox_client_js');

    const engine = new voicevox.voicevox_engine('127.0.0.1', 50021);
    testinput = "おめでとうございます！うまくいったのですね、素晴らしいです！"

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
```

TODO:
- fix it so it makes sense that is a class
- fix missing methods