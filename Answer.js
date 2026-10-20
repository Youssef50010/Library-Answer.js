
const Answer = {
    // ==== TOOLS ====
    
    json (data) {
        return JSON.stringify(data);
    },
    
    num (text) {
        return Number(text);
    },
    
    rand (min, max) {
        if (min > max) [min, max] = [max, min];
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },

    speak (text, Language, Tune, speed) {
        let sound = new SpeechSynthesisUtterance(text);
        sound.lang = Language;
        sound.pitch = Tune;
        sound.rate = speed;
        return sound
    },
    
    // ==== DOM ====
    getid (id) {
        let data;
        if ( id && (id.startsWith("#") || id.startsWith("."))) {
            data = document.querySelector(id);
        } else {
            data = document.getElementById(id);
        }
        if (!data) console.warn("id is not found");
        return data;
    },
    
    getall (all, func){
        const data = document.querySelectorAll(all);
        if (func) data.forEach(func);
        return data;
    },
    
    build (name) {
        return document.createElement(name);
    },
    
    addplace (id, place) {
        const data = this.getid(id);
        if (data) data.appendChild(place);
        return this
    },
    
    removeplace (id, place) {
        const data = this.getid(id);
        if (data && place && data.contains(place)) data.removeChild(place);
        return this
    },
    
    html (id, code) {
        const data = this.getid(id);
        if (data) data.innerHTML = code;
        return this
    },
    
    txt (id, text) {
        const data = this.getid(id);
        if (data) data.textContent = text;
        return this
    },
    
    getvalue (id) {
        const data = this.getid(id);
        return data ? data.value : null;
    },
    
    css (id, cmd, value) {
        const data = this.getid(id);
        if (data) data.style[cmd] = value;
        return this
    },
    
    addClass (id, c) {
        const data = this.getid(id);
        if (data) data.classList.add(c);
        return this
    },
    
    removeClass (id, c) {
        const data = this.getid(id);
        if (data) data.classList.remove(c);
        return this
    },
    
    // ==== EFFECTS ====
    
    hide (id) {
        const data = this.getid(id);
        if (data) data.style.display = "none";
        return this
    },
    
    show (id) {
        const data = this.getid(id);
        if (data) data.style.display = "";
        return this
    },
    
    toggle (id) {
        const data = this.getid(id);
        if (data) {
            data.style.display = data.style.display === "none" ? "" : "none";
        }
        return this
    },

    var (name, data) {
        document.documentElement.style.setProperty(name, data);
        return this
    },
    
    // ==== EVENTS ====
    
    on (id, event, func) {
        let data;
        if (typeof id === 'string') {
            data = this.getid(id);
        } else {
            data = id;
        }
        if (data) data.addEventListener(event, func)
        return this
    },
    
    off (id, event, func) {
        const data = this.getid(id);
        if (data) data.removeEventListener(event, func)
        return this
    },
    
    onClick (id, func) {
        const data = this.getid(id);
        if (data) this.on(id, "click", func);
        return this
    },
    
    // ==== STORAGE ====
    
    save (name, data) {
        try {
            localStorage.setItem(name, this.json(data));
        } catch (e) {
            console.warn("Save Failed : " + e)
        }
        return this
    },
    
    load (name) {
        let text = localStorage.getItem(name);
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    },
    
    del (name) {
        localStorage.removeItem(name);
        return this
    },
    
    clear () {
        localStorage.clear();
        return this
    },
    
    // ==== SERVER ====
    
    send (url, data, type) {
         return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': type || 'application/json'},
            body: this.json(data)
        }).then(res => res.json()).catch(err => {console.warn("Send Failed " + err)})
    },
    
    get (url) {
        return fetch(url).then(res => res.json()).catch(err => {console.warn("Get Falied " + err)})
    },

    // ==== transportation ====

    go (url) {
        window.location.href = url;
        return this
    },

    open (url) {
        window.open(url, "_blank");
        return this
    }
}
