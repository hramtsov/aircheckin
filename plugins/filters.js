import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/ru'

moment.locale('ru')


// var lenPhone = phone.length;
// var tt=phone.split('');
// if(lenPhone == 12){
// tt.splice(2,"", "(");
// tt.splice(6,"", ")");
// tt.splice(10,"", "-");
// tt.splice(13,"", "-");
// }else if(lenPhone == 13){
// tt.splice(3,"", "(");
// tt.splice(7,"", ")");
// tt.splice(11,"", "-");
// tt.splice(14,"", "-");
// }
// alert(tt.join(''))

Vue.filter('phone_number', function (value) {
	var lenPhone = value.length;
	var tt = value.split('');

	if (lenPhone == 12) {
		tt.splice(2, "", " (");
		tt.splice(6, "", ") ");
		tt.splice(10, "", "-");
		tt.splice(13, "", "-");
	} else if (lenPhone == 13) {
		tt.splice(3, "", " (");
		tt.splice(7, "", ") ");
		tt.splice(11, "", "-");
		tt.splice(14, "", "-");
	}

	return tt.join('');
})



// Округление в меньшую сторону
// Vue.filter('floor', function (value, digits = 0) {
// 	// digits = digits + 1;
// 	var pow = Math.pow(10, digits);
// 	var rounded = Math.floor(value * pow) / pow;
// 	return rounded;
// })

// Округление
// Vue.filter('round', function (value, digits = 0) {
// 	var pow = Math.pow(10, digits);
// 	var rounded = Math.round(value * pow) / pow;
// 	return rounded;
// })

// Округление в большую сторону
// Vue.filter('ceil', function (value, digits = 0) {
// 	var pow = Math.pow(10, digits);
// 	var rounded = Math.ceil(value * pow) / pow;
// 	return rounded;
// })


// Vue.filter('round', function (value, digits = 0) {
// 	var rounded = parseFloat(value.toFixed(digits));
// 	return rounded;
// })




// Склонение числительных
Vue.filter('declOfNum', function (value, array, show_value = true, delimiter = true) {
	// console.log(value)
	if (typeof value !== 'undefined') {
		var cases = [2, 0, 1, 1, 1, 2]

		if (value == null || value === null) {
			value = 0;
		}

		if (delimiter) {
			// Делим на разряды число
			var value_number = value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
		} else {
			value_number = value;
		}

		var result = show_value ? value_number + ' ' : ''

		result += array[(value % 100 > 4 && value % 100 < 20) ? 2 : cases[(value % 10 < 5) ? value % 10 : 5]]
		return result
	} else {
		return;
	}
})



// Числа в разрядах
Vue.filter('number', function (value) {
	if (typeof value !== 'undefined') {
		return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
	} else {
		return;
	}
})


// Серия и номер паспорта
// Vue.filter('passport_number', function (value) {
// 	if (typeof value !== 'undefined') {
// 		return value;
// 		// return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
// 	} else {
// 		return;
// 	}
// })


// Номер водительских прав
// Vue.filter('driver_number', function (value) {
// 	if (typeof value !== 'undefined') {
// 		return value;
// 		// return value.toString().replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
// 	} else {
// 		return;
// 	}
// })



// Время
Vue.filter('date_t', function (value) {
	if (value) {
		return moment(value).format('HH:mm') // .unix
	}
})

// Дата цифрами
Vue.filter('date_d', function (value) {
	if (value) {
		return moment(value).format('DD.MM.YYYY')
	}
})

// Год цирфами
Vue.filter('date_year', function (value) {
	if (value) {
		return moment(value).format('YYYY')
	}
})

// День + месяц прописью (сокр)
Vue.filter('date_dm', function (value) {
	if (value) {
		return moment(value).format('DD MMM')
	}
})





// Сколько ночей прошло
Vue.filter('count_nights', function (end, start) {
	if (end && start) {
		// var start = moment(start);
		// var end = moment(end);
		// var diff = end.diff(start, 'days')

		// return diff;

		var day_start = parseInt(moment(start).format('DD'));
		var day_end = parseInt(moment(end).format('DD'));

		return day_end - day_start;
	}
})

// Дата с текстовым месяцем
// Vue.filter('date_td', function (value) {
// 	if (value) {
// 		return moment.unix(value).format('DD MMMM YYYY')
// 	}
// })

// Склонение дней
// Vue.filter('declension_days', function(value) {
//     if (value) {
//         return moment().from(moment().subtract(value, 'days'), true)
//     }
// })