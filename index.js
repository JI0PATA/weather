let app = new Vue({
    el: '#app',
    data: {
        states: [
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 1, name: 'Kazan', temp: '+10'},
        ],
        select: [
            {text: 'Kazan'},
            {text: 'Moscow'}
        ],
        dialog: false,
    },
    created: function() {
        axios.get('https://api.weather.yandex.ru/v1/locations?lang=en_US', {
            headers: {
                'X-Yandex-API-Key': '81709459-03ef-4e2a-ba6c-75bed454c6f0'
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            })
    }
});