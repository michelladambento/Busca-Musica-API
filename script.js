function encontraLetra(artista, musica) {
  return fetch(`https://api.lyrics.ovh/v1/${artista}/${musica}`)
}

const form = document.querySelector('#lyrics_form')
form.addEventListener('submit', el => {
  el.preventDefault()
  doSubmit()
})

function doSubmit() {
  const letra = document.querySelector('#letra')
  const artista = document.querySelector('#artista')
  const musica = document.querySelector('#musica')

  letra.innerHTML =
    '<div class="spinner-grow" role="status"><span class="sr-only">Carregando...</span></div>'

  encontraLetra(artista.value, musica.value)
    .then(response => response.json())
    .then(data => {
      if (data.lyrics) {
        letra.innerHTML = data.lyrics
      } else {
        letra.innerHTML = data.error
      }
    })
    .catch(err => {
      letra.innerHTML = `Oops! ${err}`
    })
}
