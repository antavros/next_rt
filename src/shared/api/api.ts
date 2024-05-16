import { getDetail } from './data_types';
import PropTypes  from 'prop-types';

const dataProps = {
  url: PropTypes.string.isRequired,
  title: PropTypes.node,
};
export { dataProps };

getData.propTypes = dataProps;
const API_KEY = `${process.env.NEXT_PUBLIC_API_TOKEN}`;

export async function getData({ url }: { readonly url: string }) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY,
    },
    next: {
      revalidate: 3600
    }
  };

  const response = await fetch(url, options);

  const responseData = await response.json();

  const data = responseData.docs || [responseData];
  if (!Array.isArray(data)) throw new Error('Data is not an array');

  const detailData = (
    await Promise.all(data.map(async (title) => {
      const details = await getDetail({ title });
      return { ...details, hasPosters: details.poster && details.poster2 };
    }))
  ).filter((movie) => movie.hasPosters);
  return detailData;
}


//------------------------------------------------------------------------------------------------------------>

// export function apiUrlConstructor({ movieType }) {
//   return new Promise((resolve, reject) => {
//     const apiUrl = `${API_URL}?${API_limit}&${API_page}&${API_params}&type=${movieType}`;
//     resolve(apiUrl);
//   });
// }

// export default function Anime() {
//   const [url, setUrl] = useState(null);

//   useEffect(() => {
//     apiUrlConstructor({ movieType: `anime` }).then(setUrl);
//   }, []);

//   return (
//     <TitlesContainer url={url} />
//   );
// }


//------------------------------------------------------------------------------------------------------------>

// `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&year=${yearRange}&lists=popular-films`;

//------------------------------------------------------------------------------------------------------------>

// document.addEventListener('DOMContentLoaded', function () {
//     const navLinks = document.querySelectorAll('.nav_link');
//     navLinks.forEach((link) => {
//     link.addEventListener('click', function (event) {
//         event.preventDefault();
//         if (this.getAttribute('data-api-url')) {
//         // Если атрибут установлен, используем его значение
//         API_URL_NAV = this.getAttribute('data-api-url');
//         }
//         getTitles(API_URL_NAV);
//     });
//     });
// });

// module.exports = async function getData(url) {
//     const fileName = `./data/${url.replace(/\//g, '-')}.json`;
//     const fileExists = await fs.promises.access(fileName, fs.constants.F_OK).catch(() => false);

//     if (fileExists) {
//         const fileStats = await fs.promises.stat(fileName);
//         const isOutdated = Date.now() - fileStats.mtimeMs > 2592000000; // 30 days in ms

//     if (isOutdated) {
//         console.log(`Запрос API: ${url} (файл устарел)`);
//         return await makeRequest(url, fileName);
//         } else {
//             console.log(`Запрос API: ${url} (из кэша)`);
//             const data = await fs.promises.readFile(fileName, 'utf-8');
//             return JSON.parse(data);
//         }
//     } else {
//     console.log(`Запрос API: ${url} (новый файл)`);
//     return await makeRequest(url, fileName);
//     }
// };

// async function makeRequest(url, fileName) {
//     const options = {
//         method: 'GET',
//         headers: { accept: 'application/json' },
//     };

//     const response = await fetch(url, options);

//     if (response.ok) {
//         const data = await response.json();
//         await fs.promises.writeFile(fileName, JSON.stringify(data), 'utf-8');
//         return data;
//     } else {
//         throw new Error(`Ошибка запроса API: ${response.status}`);
//     }
// }


// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const titleId = urlParams.get('id');

//     if (!titleId) {
//         throw new Error('Отсутствует параметр "id" в URL.');
//     }

//         const resp = await fetch(`/json/${titleId}.json`);
//         const data = await resp.json();

//     if (!data) {
//         throw new Error('Получены некорректные данные.');
//     }

//     showTitles(data);
//     } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//     displayError("Произошла ошибка при загрузке данных.");
//     }
// });


// function displayError(message) {
//     const errorContainer = document.querySelector(".error");
//     if (errorContainer) {
//         errorContainer.textContent = message;
//     } else {
//         console.error("Error container not found. Cannot display error message.");
//     }
// }