import type { VideoItem } from '@/components/VideoGrid';

const youtube = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;
/**
 * A playlist embed. Pass `coverVideoId` to start the playlist on a known video —
 * that also gives the card a real thumbnail, since a bare `videoseries` URL has
 * no video ID to derive one from (21 July #16).
 */
const playlist = (listId: string, coverVideoId?: string) =>
  coverVideoId
    ? `https://www.youtube-nocookie.com/embed/${coverVideoId}?list=${listId}`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`;
const vimeo = (id: string) => `https://player.vimeo.com/video/${id}`;
const toItem = ([title, id]: string[]): VideoItem => ({
  title,
  embedUrl: id.startsWith('http') ? id : youtube(id),
});

/** DIRECCIÓN DE FOTOGRAFÍA — SUB CATEGORÍA: CINE / TV / SERIES */
export const dfCineTvSeriesVideos: VideoItem[] = [
  ['Largometraje - Ruinas Artificiales', vimeo('1198451868')],
  ['Cortometraje - It Almost Happened One Night', '6E76V9JVwV4'],
  ['Cortometraje - Soy Coreaboo', 'nO_9WENxlCg'],
  ['Serie web - Nombradas', playlist('PLpFmtbviZR2XpnJsKWD3O3MLbXxdjum1T')],
  ['Largometraje - El Voluntario', 'd8n-qo9pUUc'],
  ['Cortometraje - Lo Que Se Perdió', 'Gh-N6tr2ITs'],
  ['Cortometraje - La Pasarela', 'E3PDF01ak8k'],
  ['Institucional - Prácticas de Extensión de Educación Experiencial', 'sLpUtEgpJ8I'],
  ['Cortometraje - Barquito', 'SgdkHql2RUc'],
  ['Institucional - SelviHP 2016', 'bZthSVHTFtc'],
  ['Unitario - Capitanelli y la Nueva Generación', 'YJcimz1kMlg'],
  ['Cortometraje - La Caída de los Globos', '9pHK9h8Xby4?start=20'],
].map(toItem);

/** DIRECCIÓN DE FOTOGRAFÍA — SUB CATEGORÍA: PUBLICIDAD */
export const dfAdvertisingVideos: VideoItem[] = [
  ['Spot - La Mar Boutique', 'VnoItWH0k5k'],
  ['Spot - Catalònia Nova Equipació Horizontal', 'c8XLtf0jgjc'],
  ['Institucional - AEI Raval Spot', 'HAH5kx1k5tY'],
  ['Institucional - Colegio Jesús Salvador', 'tEpYqxS1uk4'],
  ['Institucional - Pare Manyanet Vilafranca', '5w5BAOEkSsk'],
  ['Spot - Paraná Es Para Vos', 'lKbXrzO8so8'],
  ['Spot - Ckea Estética, Todos Para Todos', 'GyzltLs-n6M'],
  ['Spot - Ckea Beauty, Beauty Para Txdos', '_RMFdcIukOw'],
  ['Spot - Eslora, Colección "Errantes 2023"', '1kLT6Frh0DU'],
  ['Spot - Restaurante Chapa Chapa', '23XKnVXUeUI'],
  ['Spot - So Fanny, Campaña Verano 2023', '1tqqkG5ZuQc'],
  ['Institucional - 60 Años Lácteos Tonutti', 'mRvv22SeqSI'],
  ['Spot - Bebida Runner', 'sOh-IRDTYc8'],
  ['Institucional - Corning Gorilla Glass & Playing for Change Foundation', '_Rq7dJRf5Ms'],
  ['Spot - Chacinados Tacural', 'rd4LkkcEQV0'],
  ['Spot - ¿Qué Mundo Me Estás Dejando? (Enersa)', playlist('PLZyHq2-Ib6nOgOA6x7ZfdZYfLH3tkhQ5J')],
  ['Institucional - Tacural, El Sabor del Fiambre Casero', 'lYz4jF6vQjE'],
  ['Spot - Montpellier de Mariana Ardissono', 'j5rrG334y-E'],
  ['Institucional - Escuela del CAE', 'OqWlNfCJjyo'],
  ['Institucional - Gottig y Cía', vimeo('492214681')],
  ['Spot - Agua Nuestra', vimeo('374658778')],
  ['Institucional - Fundición Gatti', vimeo('376798161')],
].map(toItem);

/** DIRECCIÓN DE FOTOGRAFÍA — SUB CATEGORÍA: VIDEOCLIPS & LIVE SESSIONS */
export const dfMusicVideos: VideoItem[] = [
  ['Videoclip - Vecinos de la Inmensidad (Círculo Mágico)', 'Ef4Rh7-q-JU'],
  ['Videoclip - Camino a un Sueño', 'WYcUb18279k'],
  ['Videoclip - An Ocean Thing (Ema Barreira & The Soul Flu)', 'ud5PzX-7PiA'],
  ['Videoclip - Sincronía (Yamil Isaac)', 'V4JfRlPD4Ow'],
  ['Videoclip - Un dels Nostres (All Crü)', 'UUVKZRt_7UU'],
  ['Live session - Eine Jüdische Kantate (Martín Palmeri & Quartier Ensemble)', 'IODXmFWzd_c'],
  ['Videoclip - Ya No Presume (Ema Barreira)', '2aoiM2MWCzo'],
  ['Live session - Un Fuego (Mestizo)', '3lZp0-BbiDc'],
  ['Videoclip - Luna Compañera (Duo Andariego)', '-ArCDoJuIsw'],
  ['Videoclip - En el Film (Yamil Isaac)', 'WZ653wGRJ-Q'],
  ['Live session - Serie Vibra Electrónica', playlist('PLZyHq2-Ib6nPuceqAxS0TpRiQ7pVy1Lu0', '3AvopCUxv10')],
  ['Live session - Demo Session (Francisco Aguirre)', 'cKXe-Elrw1s'],
  ['Videoclip - Flores (#Reo)', 'AJB5v-ByEYo'],
  ['Videoclip - Instantes (#Reo)', 'OKwpKQIvfsM'],
  ['Videoclip - Es (#Reo)', 'v_X9RgF9VG0'],
  ['Live session - Atardecer (Tango Infinito)', 'C5ANgicJhCo'],
].map(toItem);

/** SECCIÓN: OPERACIÓN DE CÁMARA */
export const cameraOperatorVideos: VideoItem[] = [
  ['Largometraje - Las Preñadas (Trailer)', vimeo('765837355')],
  ['Serie - Todo Para Mí', 'TtAkyQL6rME'],
  ['Aftermovie - Marter & Open Sitges', 'NFySWxcg2Tw'],
  ['Aftermovie - BYD Presentació Atto 2', 'gpDam59eiFo'],
  ['Aftermovie - Marter & Open', 'haXAz20IUxs'],
  ['Videoclip - Hilda Lizarazu, Te Reís', 'DdmF2Y2R10U'],
  ['Aftermovie - Familly Partner DJ Manu Desrets', '5lGd-tc2eIE'],
  ['Aftermovie - BYD Presentació Seal 6', 'BMGOnetaqGA'],
  ['Aftermovie - Meet Producciones con DJ Fabio Florido', 'tbjAtHbXleA'],
  ['Aftermovie - Circo Eguap', 'k5qw5-nTzQo'],
  ['Aftermovie - Shakalaka', '4_OvYbLDqLs'],
  ['Aftermovie - Bubble Circus', 'KGd_8E8Ai3o'],
  ['Aftermovie - Gatonegro Gatoblanco', 'e08AyecP3Gc'],
  ['Aftermovie - Estúpida Compañía', '02EJz0zi_YQ'],
  ['Aftermovie - Medio Metro', 'BwvehdBP4Ck'],
  ['Spot - Usá Loncheras (Esc. del CAE)', 'TaGotXa7UjE'],
  ['Aftermovie - Meet Producciones con DJ Beico', 'C8aSIB1QJLU'],
  ['Aftermovie - Almas Producciones con DJ Tri.Par.Titos', 'JnMX2NXrPb0'],
  ['Aftermovie - Meet Producciones con DJ Jay de Lys', '7W7C9x5xFnc'],
  ['Institucional - Día del Maestro (Esc. del CAE)', 'IMT26XhALs0'],
].map(toItem);

/** SECCIÓN: FOQUISTA — "El Caso Vitruvio" omitted (en postproducción, sin link) */
export const focusPullerVideos: VideoItem[] = [
  ['Largometraje - Antes del Cuerpo', vimeo('1049284207')],
  ['Largometraje - Paisaje', vimeo('909139075')],
  ['Largometraje - Parque Central', 'frXPkxWQg50'],
  ['Largometraje - Cuando Ya No Esté', 'DHfwxy9WVfo'],
  ['Largometraje - Vergara', vimeo('299458558')],
  ['Serie - Animalia', 'DetZ3kuDwYA'],
  ['Largometraje - One Shot', vimeo('299461603')],
  ['Largometraje - El Gurí', vimeo('96245972')],
  ['Serie - ¿Quién Mató al Bebé Uriarte?', '9GcUgu0sb14'],
].map(toItem);
