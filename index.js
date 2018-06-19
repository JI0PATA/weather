let app = new Vue({
    el: '#app',
    data: {
        states: [
            {id: 1, name: 'Kazan', temp: '+10'},
            {id: 2, name: 'Kazan', temp: '+11'},
            {id: 3, name: 'Kazan', temp: '+12'},
            {id: 4, name: 'Kazan', temp: '+13'},
            {id: 5, name: 'Kazan', temp: '+14'},
            {id: 6, name: 'Kazan', temp: '+15'},
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
            });
    }
});