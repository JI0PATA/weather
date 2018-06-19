let app = new Vue({
    el: '#app',
    data: {
        states: [],
        select_countrys: [],
        select_regions: [],
        select_states: [],
        lastId: 1,
        dialog: false,
        selectedCountry: null,
        selectedRegion: null,
        selectedState: null,
    },
    created: function () {
        axios.get('http://battuta.medunes.net/api/country/all/', {
            params: {
                'key': 'c8d3077953da27ba2a0e8f0e2b7bd8ca',
            }
        })
            .then(response => {
                let countrys = response.data,
                    countrys_len = countrys.length;

                for (let i = 0; i < countrys_len; i++) {
                    this.select_countrys.push(countrys[i]);
                }
            })
            .catch(e => {
                console.log(e);
            });
    },
    methods: {
        changeCountry: function () {
            this.select_regions = [];

            axios.get(`http://battuta.medunes.net/api/region/${this.selectedCountry}/all/`, {
                params: {
                    'key': 'c8d3077953da27ba2a0e8f0e2b7bd8ca',
                }
            })
                .then(response => {
                    let regions = response.data,
                        regions_len = regions.length;

                    for (let i = 0; i < regions_len; i++) {
                        this.select_regions.push(regions[i]);
                    }
                });
        },
        changeRegion: function () {
            this.select_states = [];

            axios.get(`http://battuta.medunes.net/api/city/${this.selectedCountry}/search/?region=${this.selectedRegion}`, {
                params: {
                    'key': 'c8d3077953da27ba2a0e8f0e2b7bd8ca',
                }
            })
                .then(response => {
                    let states = response.data,
                        states_len = states.length;

                    for (let i = 0; i < states_len; i++) {
                        this.select_states.push(states[i]);
                    }
                });
        },
        addNewState: function () {
            if (this.selectedState === null) return;

            axios.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx`, {
                params: {
                    key: '6ff1548d6d784340b4c102654181906',
                    q: `${this.selectedState.latitude},${this.selectedState.longitude}`,
                    num_of_days: 1,
                    format: 'json'
                }
            })
                .then(response => {
                    let cur_C = response.data.data.current_condition[0].temp_C;

                    this.states.push({
                        id: this.lastId++,
                        name: this.selectedState.city,
                        temp: cur_C > 0 ? '+' + cur_C : cur_C
                    });

                    this.selectedCountry = '';
                    this.selectedRegion = '';
                    this.selectedState = '';
                });
            this.dialog = false;
        },
    }
});