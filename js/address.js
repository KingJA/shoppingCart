new Vue({
    el: ".container",
    data: {
        addresses: [],
        currentIndex: 0,
        shippingType: 1,
        limit: 3
    },
    mounted: function () {
        this.$nextTick(function () {
            this.addressView();
        })
    },
    computed: {
        filterAddress: function () {
            return this.addresses.slice(0, this.limit);
        }

    },
    methods: {
        addressView: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                _this.addresses = response.body.result;
            })
        },
        setDefault: function (addressId) {
            this.addresses.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },
        deleteAddress: function (address) {
            var index = this.addresses.indexOf(address);
            this.addresses.splice(index, 1);
        }

    }
})