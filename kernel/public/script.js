window.addEventListener('DOMContentLoaded', (event) => {
    let dataElement = document.querySelectorAll('[data-name]');

    const findElement = e => {
        for (const element of dataElement) if (element.dataset.name === e) return element;
    };

    // Récupérer les éléments MIDI
    let player = document.getElementById("player");
    let v_staff = document.getElementById("v_staff");
    let v_roll = document.getElementById("v_roll");

    fetch('/data').then(response => response.text()).then(data => {
        let parsedData = JSON.parse(data);
        let nameElement = findElement('name');
        nameElement.innerHTML = parsedData.name;
        if (parsedData.midi) {
            let midiElement = findElement('midi');
            midiElement.getElementsByTagName("a")[0].href = parsedData.midi;
            midiElement.style.display = "";
        }
        if (parsedData.json) {
            let midiElement = findElement('json');
            midiElement.getElementsByTagName("a")[0].href = parsedData.json;
            midiElement.style.display = "";
        }
        if (parsedData.tracks) {
            let tracksElement = findElement('tracks');
            parsedData.tracks.forEach(track => {
                let trackElement = document.createElement("div");
                let header = document.createElement("h2");
                header.innerHTML += "<span>Track #" + track.id + "</span>";
                header.innerHTML += "<span>" + track.instrument + "</span>";
                header.innerHTML += "<span>Channel " + track.channel + "</span>";
                header.innerHTML += "<span>" + track.tempo + " bpm</span>";
                trackElement.append(header);
                let midiVisualizer = document.createElement("midi-visualizer");
                midiVisualizer.id = "track_" + track.id + "_staff";
                midiVisualizer.src = "";
                midiVisualizer.type = "staff";
                trackElement.append(midiVisualizer);
                tracksElement.append(trackElement)
            })
            parsedData.tracks.forEach(track => {
                let midiVisualizer = document.getElementById("track_" + track.id + "_staff");
                fetch('/track/' + track.id).then(response => response.text()).then(dataUri => midiVisualizer.src = dataUri);
            })
        }
    })

    // Récupérer le MIDI du serveur
    fetch('/midi').then(response => response.text()).then(dataUri => {
        // Définir l'URI MIDI pour les visualiseurs et le lecteur
        player.src = dataUri;
        v_staff.src = dataUri;
        v_roll.src = dataUri;

        player.addVisualizer(v_staff);
        player.addVisualizer(v_roll);
    });
});