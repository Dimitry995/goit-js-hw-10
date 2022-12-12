
// function fetchCountries(name) {
// target.WebGLActiveInfo: ("https://restcountries.com/v3.1/name/${name}");
// } 
// try {
//     if (name not found);
// }
// catch {
//     return "Oops, there is no country with that name";
// }

// function target("submit", fetchCountries) {
// async function fetchCountries(name){
// 	const response = await fetch(`https://restcountries.com/v3.1/name/{name}`);
// 	const responseData = await response.json();

// 	return responseData;
// }
// }
// async function getCountries(){
// 	const response = await fetch(`https://restcountries.com/v3.1/all`);
// 	const responseData = await response.json();

// 	return responseData;
// }
// getCountries();
 let inPut = document.getElementById("search-box");
//  let button = document.getElementById("control");
//  button.addEventListener("click", a => {
//     fetchCountries({name})
//     // let outPut = inPut.value;
//     // console.log(outPut)
// });
// function fetchCountries({name}) {
//     return fetch(
//       `https://restcountries.com/v3.1/all?fields=${name}`
//     ).then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       else {
// return response.json();
//     }})
//      .then(data => {
//      console.log(data);
//    })
//   }

export function fetchCountries(findCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${findCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}