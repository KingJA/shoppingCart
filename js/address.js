new Vue({
    el: ".container",
    data: {
        addresses: []
    },
    mounted: function () {
        this.$nextTick(function () {
            this.addressView();
        })
    },
    methods: {
        addressView: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                _this.addresses = response.body.result;
            })
        }

    }
})