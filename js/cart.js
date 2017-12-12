/**
 * Created by Administrator on 2017/12/12.
 */
var vm = new Vue({
    el: "#app",
    data: {
        allChecked: false,
        showDeleteDialog: false,
        totlePrice: 0,
        currentDeleteItem: '',
        productList: []
    },
    filters: {
        money: function (value) {
            return "¥ " + value.toFixed(2) + "元";
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get("data/cartData.json").then(function (response) {
                _this.productList = response.body.result.list;
            });
        },
        setCount: function (product, type) {
            if (type > 0) {
                product.productQuantity++;
            } else {
                if (product.productQuantity < 2) {
                    return
                }
                product.productQuantity--;
            }
            this.calcTotlePrice();
        }
        , selectItem: function (product) {
            if (typeof product.checked == 'undefined') {
                Vue.set(product, "checked", true);
            } else {
                product.checked = !product.checked;
            }
            this.calcTotlePrice();
        },
        checkAll: function (checked) {
            this.allChecked = checked;
            this.productList.forEach(function (product, index) {
                if (typeof product.checked == 'undefined') {
                    Vue.set(product, "checked", checked);
                } else {
                    product.checked = checked;
                }
            })
            this.calcTotlePrice();
        },
        calcTotlePrice: function () {
            var _this = this;
            this.totlePrice = 0;
            this.productList.forEach(function (product, index) {
                if (product.checked == true) {
                    _this.totlePrice += product.productPrice * product.productQuantity;
                }
            })
        },
        showDialog: function (product) {
            this.showDeleteDialog = true;
            this.currentDeleteItem = product;
        },
        doDeleteItem: function () {
            var deleteItem = this.productList.indexOf(this.currentDeleteItem);
            this.productList.splice(deleteItem, 1);
            this.showDeleteDialog = false;
            this.calcTotlePrice();
        }
    }
})

Vue.filter("yuanmoney", function (value, unit) {
    return value + unit;
})
