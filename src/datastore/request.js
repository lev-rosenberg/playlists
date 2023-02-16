async function get_playlist(){
    const url = ("http://localhost:3001/get_playlist/1");
    const response = await fetch(url,{method: 'GET'});
    return (await response.json());
}
async function playlists(){
    const url = ("http://localhost:3001/playlists");
    const response = await fetch(url,{method: 'GET'});
    return (await response.json());
}
export {get_playlist, playlists};