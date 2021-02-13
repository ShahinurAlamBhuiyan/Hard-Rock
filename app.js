// Function : To search users...
const searchSongs = async () => {
    const searchText = document.getElementById("inputValue").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleShow();
    try{
        const res = await fetch(url)
        const data = await res.json()
        displaySongs(data.data);
    }
    catch{
        displayError("Something went wrong! Please, check your spell & try again later.")
    }
}

// 'Enter' to use search button...
inputValue.addEventListener("keypress", function(event) {
    if (event.key === 'Enter'){
       document.getElementById("searchBtn").click();
    }
});

// Function : To display songs by searching...
const displaySongs = songs => {
    const songContainer = document.getElementById("songContainer");
    songContainer.innerHTML = '';
    document.getElementById("inputValue").value = '';
    document.getElementById("showError").innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getSongLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
        toggleShow();
    });
}

// Function : To get the lyrics API...
const getSongLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res = await fetch(url)
        const data = await res.json()
        displayLyrics(data.lyrics)
    }
    catch(error){
        displayError('Sorry! I failed to load your lyrics.')
    }
}

// Function : To display song lyrics...
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("lyricsDiv")
    lyricsDiv.innerText = lyrics;
}

// Function : To display error message...
const displayError = error =>{
    document.getElementById("songContainer").innerHTML = '';
    document.getElementById("inputValue").value = '';
    const errorTag = document.getElementById('showError');
    errorTag.innerText = error;
    toggleShow()
}

// Function : To display Spinner...
const toggleShow = ()=>{
    const spinner = document.getElementById("spinnerDiv");
    spinner.classList.toggle('d-none');

    const songs = document.getElementById('songContainer');
    songs.classList.toggle('d-none');

    const errorMessage = document.getElementById('showError');  
    errorMessage.classList.toggle('d-none');
}
