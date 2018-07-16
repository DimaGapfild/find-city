;
(function(){

	// preventDefault from Enter press
	document.onkeypress = enterCheck;
	function enterCheck (e) {
		 if (e.which === 13 /* Enter */) {
      	e.preventDefault();
      	inputBlur();
      }
	};

	// chache all required elements
   const sourceDataURL = 'data/city.json',
   			cities=[],
   			countries=[],
   			languages=[],
   			list = document.querySelector('.output-data'),
   			input = document.querySelector('#city');
   	//get data from the source URL

   	fetch(sourceDataURL)
   						.then((response) => response.json())
   						.then((data) => {				// add data to the arrays
   							cities.push(...data.city);
   							countries.push(...data.country);
   							languages.push(...data.countrylanguage);
   						})
   						.then(()=> { 					//turn on form input
   							input.disabled = false;
   							input.placeholder = 'We are ready!';
   							document.querySelector('.output-data li').style.display = 'inline-block';
   						});

   	//get data about country

   	function getCountry (code){
   		country = countries.filter( data => data.Code === code);
   		return country[0].Name
   	}

   	//get data about languages

   	function getLang (code){
   		const filteredLanguages = languages.filter( data => data.CountryCode === code);
   		let result='';
   		filteredLanguages.forEach(
   			function(data){
   				lang=data.Language;
   				result += ' ' + lang 
					});
   		return result
   	}

   	//create an array with all required data

   	function getCity(inputValue) {
   		data = cities.filter( data => {
   			const regExp = new RegExp (inputValue, 'gi')
   			return data.Name.match(regExp)
   		})
   		data.forEach(function (obj) {
   			let code = obj.CountryCode;
   			obj.country = getCountry(code);
   			obj.lang = getLang(code);
			})
   		return data
   	}

   	//output filtered data to the screen

   	function displayResult() {
   		const resultList = getCity(this.value);
   			html = resultList.map(data => {
   				return `
					<li>
						<p class="city-name">${data.Name}<span class="pull-right"><button class="btn btn-warning edit-btn"><i class="far fa-edit" aria-hidden="true"></i></button>
						<button class="btn btn-danger remove-btn"><i class="fa fa-times" aria-hidden="true"></i></button></span></p>
						<div class="more-info">
						<p class="country-name">Country:<span class="pull-right">${data.country}</span></p>
						<p class="languages">Language: <span class="pull-right">${data.lang}</span></p>
						</div>
						<hr>
					</li>
   				`
   			}).join('');
		list.innerHTML = html;

		// adding event listener to each new element

		EvList();
		function EvList(){
			const remBtns = document.querySelectorAll('.remove-btn');
			remBtns.forEach(data => {
				data.addEventListener('click', rem);
				data.addEventListener('mouseenter', inputBlur);
			});
    	}
    }

    // remove element from the list

   	function rem(){
   		alert('we are removing this city from the list, but it can be removed from the database also!')
   		this.closest('li').remove();
   	}

   	//remove focus from input field

   	function inputBlur (){
   		input.blur();
   	}

   	// input event listeners

   	input.addEventListener('change', displayResult);
   	input.addEventListener('keyup', displayResult);

})()
